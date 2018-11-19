#!/usr/bin/env python

import boto3
from utils_git import get_git_sha
from utils import _stack_exists

import argparse

if __name__ == "__main__":

    parser = argparse.ArgumentParser(description="Check _stack_exists")
    parser.add_argument("--stack-name", help="Stack name to check", default=None,
                        action="store")
    args = parser.parse_args()

    print(args.stack_name)

    print(_stack_exists(args.stack_name))

    # client = boto3.client('ecr')

    # r = client.describe_images(
    #     repositoryName='booking',
    #     imageIds=[
    #         {
    #             'imageTag': get_git_sha()
    #         },
    #     ],
    # )

    # import pprint
    # pp = pprint.PrettyPrinter(indent=4)
    # pp.pprint(r)
