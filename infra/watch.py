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


if __name__ == "__main__":
    pass
