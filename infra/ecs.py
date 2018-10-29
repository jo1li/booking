import boto3

from utils import jprint, parse_env_file

def get_docker_repo(image_name):

    client = boto3.client('ecr')

    response = client.describe_repositories(repositoryNames=[image_name])

    if len(response['repositories']) != 1:
        raise Exception("Not one docker repo returned. Check your configuration.")

    return response['repositories'][0]


def create_log_group(name):

    log_client = boto3.client('logs')
    log_check_response = log_client.describe_log_groups(
        logGroupNamePrefix=name,
    )

    if len(log_check_response["logGroups"]) == 0:
        log_response = log_client.create_log_group(
            logGroupName=name,
        )
        jprint(log_response)


def register_task_definition(task_image, task, extra_env={}):

    client = boto3.client('ecs')

    task_family = task['name']
    task_name = task['name']

    # Sane defaults
    task_cpu = task['cpu']
    task_memory = task['memory']
    task_role_arn = task['role_arn']
    task_execution_role_arn = task['execution_role_arn']

    environment = parse_env_file("./infra/config/{}.env".format(task_name))

    if(len(extra_env) > 0):
        environment.append(extra_env)

    # Log group setup
    log_group = "/ecs/{}".format(task_name)
    create_log_group(log_group)

    # Will create the task family if it doesn't exist
    task_response = client.register_task_definition(
        family=task_family,
        taskRoleArn=task_role_arn,
        executionRoleArn=task_execution_role_arn,
        networkMode="awsvpc",
        cpu=task_cpu,
        memory=task_memory,
        containerDefinitions=[
            {
                'name': task_name,
                'image': task_image,
                'portMappings': [
                    {
                        'containerPort': 80,
                        'hostPort': 80,
                        'protocol': 'tcp'
                    },
                ],
                'essential': True,
                'command': [
                    "./scripts/cmd-web.sh"
                ],
                'environment': environment,
                'mountPoints': [],
                'volumesFrom': [],
                'logConfiguration': {
                    'logDriver': 'awslogs',
                    'options': {
                        "awslogs-group": log_group,
                        "awslogs-region": "us-east-2",
                        "awslogs-stream-prefix": "ecs"
                    }
                },
            },
        ],
        volumes=[],
        requiresCompatibilities=[
            'FARGATE',
        ]
    )

    jprint(task_response)

    return task_response['taskDefinition']['taskDefinitionArn']
