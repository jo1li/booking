import boto3

from utils import jprint

def create_elb(vpc, elb):

    elb_client = boto3.client('elbv2')

    elb_certificate_arn = elb['certificate_arn']

    elb_response = elb_client.create_load_balancer(
        # TODO: make this specific to branch
        Name='baton-stage',
        Subnets=vpc['subnets'],
        SecurityGroups=elb['security_groups'] + vpc['security_groups'],
        Scheme='internet-facing',
        Type='application',
        IpAddressType='ipv4'
    )
    elb_arn = elb_response['LoadBalancers'][0]['LoadBalancerArn']

    target_group_response = elb_client.create_target_group(
        Name='baton-stage',
        Protocol='HTTP',
        Port=80,
        VpcId=vpc['vpc_id'],
        HealthCheckProtocol='HTTP',
        HealthCheckPort='80',
        HealthCheckPath='/healthcheck',
        HealthCheckIntervalSeconds=15,
        HealthCheckTimeoutSeconds=5,
        HealthyThresholdCount=3,
        UnhealthyThresholdCount=3,
        Matcher={
            'HttpCode': '200'
        },
        TargetType='ip'
    )
    jprint(target_group_response)
    target_group_arn = target_group_response["TargetGroups"][0]["TargetGroupArn"]

    modify_target_group_attributes_response = elb_client.modify_target_group_attributes(
        TargetGroupArn=target_group_arn,
        Attributes=[
            {
                'Key': 'deregistration_delay.timeout_seconds',
                'Value': '30'
            },
        ]
    )
    jprint(modify_target_group_attributes_response)

    # TODO: look for existence of listener on port, update if exists
    listener_80_response = elb_client.create_listener(
        LoadBalancerArn=elb_arn,
        Protocol='HTTP',
        Port=80,
        DefaultActions=[
            {
                'Type': 'forward',
                'TargetGroupArn': target_group_arn,
            },
        ]
    )
    jprint(listener_80_response)

    listener_443_response = elb_client.create_listener(
        LoadBalancerArn=elb_arn,
        Protocol='HTTPS',
        Port=443,
        Certificates=[
            {
                'CertificateArn': elb_certificate_arn
            },
        ],
        DefaultActions=[
            {
                'Type': 'forward',
                'TargetGroupArn': target_group_arn,
            },
        ]
    )
    jprint(listener_443_response)

    return target_group_arn
