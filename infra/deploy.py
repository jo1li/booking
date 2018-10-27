#!/usr/bin/env python

import os
import boto3
import json
import argparse
import docker
import base64
import yaml

from executor import execute
from datetime import datetime

from utils import docker_output_stream, get_path, jprint
from utils_git import get_git_sha, get_git_repo, get_git_repo_remote
from ecs import create_log_group, register_task_definition
from elb import create_elb

def new_task_rev_and_update_service(task_image, env):

    cluster = env['cluster']
    service_name = env['service']['name']

    # Log group setup
    log_group = "/ecs/{}".format(service_name)
    create_log_group(log_group)

    # Returns arn
    task_definition_arn = register_task_definition(task_image, log_group, env['task'])

    target_group_arn = create_elb(env['vpc'], env['elb'])

    # Check to see if the service exists
    client = boto3.client('ecs')
    services = client.list_services(cluster=cluster)

    if len(services['serviceArns']) == 0:

        response = client.create_service(
            cluster=cluster,
            serviceName=service_name,
            taskDefinition=task_definition_arn,
            loadBalancers=[
                {
                    'targetGroupArn': target_group_arn,
                    'containerName': 'baton-stage',
                    'containerPort': 80
                },
            ],
            desiredCount=1,
            launchType='FARGATE',
            deploymentConfiguration={
                'maximumPercent': 100,
                'minimumHealthyPercent': 0
            },
            networkConfiguration={
                'awsvpcConfiguration': {
                    'subnets': env['subnets'],
                    'securityGroups': env['security_groups'],
                    'assignPublicIp': 'ENABLED'
                }
            },
            healthCheckGracePeriodSeconds=30,
            schedulingStrategy='REPLICA'
        )

    elif len(services['serviceArns']) == 1:
        response = client.update_service(
            cluster=cluster,
            service=service_name,
            taskDefinition=task_definition_arn,
            forceNewDeployment=True
        )
        jprint(response)


# TODO: break up the build and push bits.
def build_and_push_image(env):

    # TODO: at some point, we're going to want dupe builds with the same sha
    #   in that case, run a check against tags, and add another random identifier
    #   if the current sha exists
    sha = get_git_sha()
    image_name = env['docker']['image_name']
    repo_uri = "{}/{}".format(env['docker']['repo_uri'], image_name)
    pre_build = env['docker']['pre_build'] if 'pre_build' in env['docker'] else False


    full_repo_uri = "{}:{}".format(repo_uri, sha)

    # From docker.pre_build
    if pre_build:
        execute(pre_build)

    cli = docker.APIClient()
    stream = cli.build(path=get_path(), rm=True, tag=full_repo_uri)

    docker_output_stream(stream)

    ecr_client = boto3.client('ecr')
    docker_client = docker.from_env()

    # login to aws registry
    ecr_resp = ecr_client.get_authorization_token()
    ecr_token = ecr_resp['authorizationData'][0]['authorizationToken']
    ecr_decoded = base64.b64decode(ecr_token).split(':')

    auth_config = {
        'username': ecr_decoded[0],
        'password': ecr_decoded[1],
        'registry': ecr_resp['authorizationData'][0]['proxyEndpoint']
    }

    print("Pushing {} to {}".format(sha, repo_uri))
    stream = docker_client.images.push(repo_uri, tag=sha, auth_config=auth_config, stream=True)
    docker_output_stream(stream)

    return full_repo_uri


def deploy_info():
    repo = get_git_repo()
    remote = get_git_repo_remote(repo, 'origin')

    # TODO: Kind of unsure why this is a loop?
    #   I thought it was only 1 remote:URL
    urls = remote.urls
    for url in urls:
        url = url

    url = "https://{}/tree/{}".format(
            url.replace("git@", "").replace(":", "/").replace(".git", ""),
            get_git_sha()
        )

    deploy_data = {
        "commit": url,
        "branch": repo.active_branch.name,
        "deployed_on": datetime.now().strftime("%Y-%m-%d %H:%M")
    }

    path = os.path.join(get_path(), "baton/deploy.json")
    with open(path, 'w') as outfile:
        json.dump(deploy_data, outfile)


if __name__ == "__main__":

    envs = ["opus-stage"]

    description = """
        This script will prompt users to add the remote for the tier
        they intend to deploy to, check all code is committed,
        and then do the push for us.
        """

    parser = argparse.ArgumentParser(description=description)
    parser.add_argument("--verbose", help="increase output verbosity",
                        action="store_true")
    parser.add_argument("--env", help="Which environment to deploy to", default='opus-stage',
                        action="store", choices=envs)
    args = parser.parse_args()

    config_file = os.path.join(
        get_path(), "infra", "config", "{}.yml".format(args.env))

    with open(config_file, 'r') as stream:
        try:
            yaml_env = yaml.load(stream)
        except yaml.YAMLError as exc:
            print(exc)

    # Drop the json file with build info
    deploy_info()

    # Build out the
    new_image = build_and_push_image(yaml_env)

    new_task_rev_and_update_service(new_image, yaml_env)


