import troposphere.elasticloadbalancingv2 as Elb
from troposphere import Template, Parameter, Ref, Output, GetAtt
from troposphere.logs import LogGroup
from troposphere.ecs import (
    Service, TaskDefinition,
    ContainerDefinition, NetworkConfiguration,
    AwsvpcConfiguration, PortMapping, HealthCheck,
    LogConfiguration, Environment, LoadBalancer,
    DeploymentConfiguration
)

t = Template()

basename_param = t.add_parameter(Parameter(
    "BaseName",
    Description="BaseName for stack",
    Type="String",
))

vpc_id = t.add_parameter(Parameter(
    "VpcId",
    Description="VPC ID",
    Type="AWS::EC2::VPC::Id"
))

vpc_security_groups = t.add_parameter(Parameter(
    "VpcSecurityGroups",
    Description="Security Groups for VPC",
    Type="List<AWS::EC2::SecurityGroup::Id>"
))

vpc_subnets = t.add_parameter(Parameter(
    "VpcSubnets",
    Description="Subnets in our VPC",
    Type="List<AWS::EC2::Subnet::Id>"
))

elb_security_groups = t.add_parameter(Parameter(
    "ElbSecurityGroup",
    Description="Security Group for ELB",
    Type="List<AWS::EC2::SecurityGroup::Id>"
))

certificate_arn = t.add_parameter(Parameter(
    "CertificateArn",
    Description="SSL Certificate Arn",
    # TODO: is there an ARN type?
    Type="String"
))

cluster_name = t.add_parameter(Parameter(
    "ClusterName",
    Description="Cluster to deploy to",
    Type="String"
))

deploy_maximum_percent = t.add_parameter(Parameter(
    "DeployMaximumPercent",
    Description="Deployment Maximum Percent",
    Type="String"
))

deploy_minimum_healthy_percent = t.add_parameter(Parameter(
    "DeployMinimumHealthyPercent",
    Description="Deployment Minimum Healthy Percent",
    Type="String"
))

task_role_arn = t.add_parameter(Parameter(
    "TaskRoleArn",
    Description="Role to run tasks under",
    Type="String"
))

task_execution_role_arn = t.add_parameter(Parameter(
    "ExecutionRoleArn",
    Description="Role to execute tasks under",
    Type="String"
))

task_image = t.add_parameter(Parameter(
    "TaskImage",
    Description="Full URI of Docker Image",
    Type="String"
))

django_settings_module = t.add_parameter(Parameter(
    "EnvDjangoSettingsModule",
    Description="Django Settings module env var",
    Type="String"
))

static_js_app_bundle = t.add_parameter(Parameter(
    "EnvStaticJsBundle",
    Description="JS Bundle",
    Type="String"
))

log_group = LogGroup("LogGroup", LogGroupName=Ref(basename_param))
t.add_resource(log_group)

elb = t.add_resource(Elb.LoadBalancer(
    "ALB",
    Scheme="internet-facing",
    Subnets=Ref(vpc_subnets),
    SecurityGroups=Ref(elb_security_groups)
))


elb_target_group = t.add_resource(Elb.TargetGroup(
    "TargetGroup",
    DependsOn=["ALB"],
    HealthCheckProtocol="HTTP",
    HealthCheckIntervalSeconds="15",
    HealthCheckTimeoutSeconds="10",
    HealthCheckPath='/healthcheck',
    HealthyThresholdCount="3",
    UnhealthyThresholdCount="3",
    Matcher=Elb.Matcher(HttpCode="200"),
    TargetType='ip',
    TargetGroupAttributes=[
        Elb.TargetGroupAttribute(
            Key='deregistration_delay.timeout_seconds',
            Value='15',
        )
    ],
    Port="80",
    Protocol="HTTP",
    VpcId=Ref(vpc_id)
))

elb_80_listener = t.add_resource(Elb.Listener(
    "Elb80Listener",
    DependsOn="ALB",
    Port="80",
    Protocol="HTTP",
    LoadBalancerArn=Ref(elb),
    DefaultActions=[Elb.Action(
        Type="forward",
        TargetGroupArn=Ref(elb_target_group)
    )]
))

elb_443_listener = t.add_resource(Elb.Listener(
    "Elb443Listener",
    DependsOn="ALB",
    Port="443",
    Protocol="HTTPS",
    LoadBalancerArn=Ref(elb),
    Certificates=[
        Elb.Certificate(CertificateArn=Ref(certificate_arn))
    ],
    DefaultActions=[Elb.Action(
        Type="forward",
        TargetGroupArn=Ref(elb_target_group)
    )]
))

task_definition = t.add_resource(TaskDefinition(
    'TaskDefinition',
    Family=Ref(basename_param),
    RequiresCompatibilities=['FARGATE'],
    TaskRoleArn=Ref(task_role_arn),
    ExecutionRoleArn=Ref(task_execution_role_arn),
    # TODO: Connect these to config
    # https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html#cfn-ecs-taskdefinition-cpu
    Cpu='256',
    Memory='512',
    NetworkMode='awsvpc',
    ContainerDefinitions=[
        ContainerDefinition(
            Name=Ref(basename_param),
            Image=Ref(task_image),
            Essential=True,
            PortMappings=[PortMapping(ContainerPort=80)],
            Command=["./scripts/cmd-web.sh"],
            Environment=[
                Environment(
                    Name="DJANGO_SETTINGS_MODULE",
                    Value=Ref(django_settings_module)
                ),
                Environment(
                    Name="STATIC_JS_APP_BUNDLE",
                    Value=Ref(static_js_app_bundle)
                )
            ],
            HealthCheck=HealthCheck(
                Command=[
                    "CMD-SHELL",
                    "curl -f http://localhost/healthcheck || exit 1"
                ],
                Interval=10,
                Timeout=5,
                Retries=5,
                StartPeriod=30
            ),
            LogConfiguration=LogConfiguration(
                LogDriver='awslogs',
                Options={
                    "awslogs-group": Ref(log_group),
                    "awslogs-region": "us-east-2",
                    "awslogs-stream-prefix": "ecs"
                }
            )
        )
    ]
))

service = t.add_resource(Service(
    'EcsService',
    Cluster=Ref(cluster_name),
    DependsOn=["ALB", "Elb80Listener", "Elb443Listener", "TargetGroup"],
    # Todo: Connect config for DesiredCount
    DesiredCount=1,
    TaskDefinition=Ref(task_definition),
    LaunchType='FARGATE',
    HealthCheckGracePeriodSeconds=30,
    SchedulingStrategy='REPLICA',
    NetworkConfiguration=NetworkConfiguration(
        AwsvpcConfiguration=AwsvpcConfiguration(
            Subnets=Ref(vpc_subnets),
            SecurityGroups=Ref(vpc_security_groups),
            AssignPublicIp="ENABLED"
        )
    ),
    LoadBalancers=[
        LoadBalancer(
            TargetGroupArn=Ref(elb_target_group),
            ContainerName=Ref(basename_param),
            ContainerPort=80
        )
    ],
    DeploymentConfiguration=DeploymentConfiguration(
        MaximumPercent=Ref(deploy_maximum_percent),
        MinimumHealthyPercent=Ref(deploy_minimum_healthy_percent),
    )
))

t.add_output(Output(
    "ElbDnsName",
    Description="DNS Name of ELB",
    Value=GetAtt(elb, "DNSName")
))

def stack_json():
    return t.to_json()

if __name__ == "__main__":

    print(stack_json())
