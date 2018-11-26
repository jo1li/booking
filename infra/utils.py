import os
import json
import yaml
import boto3

from datetime import datetime
cf_client = boto3.client('cloudformation')


def jprint(data):
    print(json.dumps(data, indent=4, sort_keys=True, default=str))


def get_path():
    return os.getcwd()


def docker_output_stream(stream, error_key='errorDetail'):
    for chunk in stream:
        if error_key in chunk:

            chunklets = chunk.split('\n')

            for chunklet in chunklets:

                chunkletStripped = chunklet.strip()
                if len(chunkletStripped) > 0:
                    chunkletJson = json.loads(chunkletStripped)
                    raise Exception(chunkletJson[error_key])

        print(chunk)


def get_config(file):

    file = os.path.join(get_path(), file)

    if not os.path.isfile(file):
        raise Exception("{} does not exist".format(file))

    with open(file, 'r') as stream:
        yaml_env = yaml.load(stream)

    return yaml_env


# Currently not used, as we decided to move all config into files
#   TODO: Move config out of files
def parse_env_file(file):

    retval = []

    with open(file, 'r') as f:
        line = f.readline()
        while line:
            if line.strip() == "":
                line = f.readline()
                continue

            pair = line.strip().split('=')
            keyval = {
                'name': pair[0],
                'value': pair[1],
            }
            retval.append(keyval)
            line = f.readline()

    return retval



def _parse_template(template):
    with open(template) as template_fileobj:
        template_data = template_fileobj.read()
    cf_client.validate_template(TemplateBody=template_data)
    return template_data


def _parse_parameters(parameters):
    with open(parameters) as parameter_fileobj:
        parameter_data = json.load(parameter_fileobj)
    return parameter_data


def _stack_exists(stack_name):

    stack_list = cf_client.list_stacks(StackStatusFilter=[
        'CREATE_IN_PROGRESS','CREATE_FAILED','CREATE_COMPLETE','ROLLBACK_IN_PROGRESS','ROLLBACK_FAILED','ROLLBACK_COMPLETE','UPDATE_IN_PROGRESS','UPDATE_COMPLETE_CLEANUP_IN_PROGRESS','UPDATE_COMPLETE','UPDATE_ROLLBACK_IN_PROGRESS','UPDATE_ROLLBACK_FAILED','UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS','UPDATE_ROLLBACK_COMPLETE','REVIEW_IN_PROGRESS',
    ])

    stacks = stack_list['StackSummaries']
    for stack in stacks:
        if stack['StackStatus'] == 'DELETE_COMPLETE':
            continue
        if stack_name == stack['StackName']:
            return True
    return False


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError("Type not serializable")
