#!/usr/bin/env python

import os
import json
import argparse

from executor import execute
from datetime import datetime

from utils import get_path, get_config, _stack_exists, json_serial
from utils_git import get_git_sha, get_git_repo, get_git_repo_remote
from ecs import build_and_push_image

from stack import stack_json

import boto3
import botocore


def deploy_info(env):
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

    path = os.path.join(get_path(), env['deploy_info_file'])
    with open(path, 'w') as outfile:
        json.dump(deploy_data, outfile)


def deploy(image, js_bundle, yaml_env):

    cf_client = boto3.client('cloudformation')

    parameters = [
        {
            'ParameterKey': 'BaseName',
            'ParameterValue': yaml_env['name'],
        },
        {
            'ParameterKey': 'VpcId',
            'ParameterValue': yaml_env['vpc']['vpc_id'],
        },
        {
            'ParameterKey': 'VpcSecurityGroups',
            'ParameterValue': ",".join(yaml_env['vpc']['security_groups']),
        },
        {
            'ParameterKey': 'VpcSubnets',
            'ParameterValue': ",".join(yaml_env['vpc']['subnets']),
        },
        {
            'ParameterKey': 'CertificateArn',
            'ParameterValue': yaml_env['elb']['certificate_arn'],
        },
        {
            'ParameterKey': 'ElbSecurityGroup',
            # TODO: group these in the template, and not the parameter
            'ParameterValue': ",".join(yaml_env['elb']['security_groups'] + yaml_env['vpc']['security_groups']),
        },
        {
            'ParameterKey': 'ClusterName',
            'ParameterValue': yaml_env['cluster'],
        },
        {
            'ParameterKey': 'DeployMaximumPercent',
            'ParameterValue': str(yaml_env['service']['deploy']['maximum_percent']),
        },
        {
            'ParameterKey': 'DeployMinimumHealthyPercent',
            'ParameterValue': str(yaml_env['service']['deploy']['minimum_healthy_percent']),
        },
        {
            'ParameterKey': 'TaskRoleArn',
            'ParameterValue': yaml_env['task']['role_arn'],
        },
        {
            'ParameterKey': 'ExecutionRoleArn',
            'ParameterValue': yaml_env['task']['execution_role_arn'],
        },
        {
            'ParameterKey': 'TaskImage',
            'ParameterValue': new_image
        },
        {
            'ParameterKey': 'EnvDjangoSettingsModule',
            'ParameterValue': yaml_env['task']['django_settings_module'],
        },
        {
            'ParameterKey': 'EnvStaticJsBundle',
            'ParameterValue': js_bundle
        },
    ]

    stack_name = yaml_env['name']
    boto_params = {
        'StackName': stack_name,
        'TemplateBody': stack_json(),
        'Parameters': parameters
    }

    try:
        if _stack_exists(stack_name):
            print('Updating {}'.format(stack_name))
            stack_result = cf_client.update_stack(**boto_params)
            waiter = cf_client.get_waiter('stack_update_complete')
        else:
            print('Creating {}'.format(stack_name))
            boto_params['TimeoutInMinutes'] = 10
            stack_result = cf_client.create_stack(**boto_params)
            waiter = cf_client.get_waiter('stack_create_complete')
        print("...waiting for stack to be ready...")
        waiter.wait(StackName=stack_name)
    except botocore.exceptions.ClientError as ex:
        error_message = ex.response['Error']['Message']
        if error_message == 'No updates are to be performed.':
            print("No changes")
        else:
            raise
    else:
        print(json.dumps(
            cf_client.describe_stacks(StackName=stack_result['StackId']),
            indent=2,
            default=json_serial
        ))


if __name__ == "__main__":

    description = """
        This script will prompt users to add the remote for the tier
        they intend to deploy to, check all code is committed,
        and then do the push for us.
        """

    parser = argparse.ArgumentParser(description=description)
    parser.add_argument("--verbose", help="increase output verbosity",
                        action="store_true")
    parser.add_argument("--env-file", help="Which environment to deploy to", default='booking-stage',
                        action="store")
    parser.add_argument("--branch", help="Branch deploy", default=None,
                        action="store")
    args = parser.parse_args()

    yaml_env = get_config(args.env_file)

    if args.branch:
        yaml_env['name'] = "{}-{}".format(yaml_env['name'], args.branch)
        yaml_env['task']['django_settings_module'] = 'booking.settings.stage_aws_branch'

    # Build out the image
    new_image = build_and_push_image(yaml_env)
    js_bundle = execute(yaml_env['docker']['js_find'], capture=True)

    deploy(new_image, js_bundle, yaml_env)
