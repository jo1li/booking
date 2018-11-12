import boto3
import docker
import base64

from executor import execute

from utils import docker_output_stream, get_path
from utils_git import get_git_sha


def get_docker_repo(image_name):

    client = boto3.client('ecr')

    response = client.describe_repositories(repositoryNames=[image_name])

    if len(response['repositories']) != 1:
        raise Exception("Not one docker repo returned. Check your configuration.")

    return response['repositories'][0]


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
