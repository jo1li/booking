#!/usr/bin/env python

import boto3
from utils_git import get_git_sha

if __name__ == "__main__":
    print("here")


    client = boto3.client('ecr')

    r = client.describe_images(
        repositoryName='booking',
        imageIds=[
            {
                'imageTag': get_git_sha()
            },
        ],
    )

    import pprint
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(r)
