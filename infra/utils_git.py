from git import Repo

from utils import get_path

def get_git_repo():
    return Repo(get_path())


def get_git_repo_remote(repo, name):
    remote = False
    for r in repo.remotes:
        if r.name == name:
            remote = r
            break

    if not remote:
        # TODO: Color this red.
        # Not sure if we actually need this here.
        print("You need to add the remote for this tier.")
        exit()

    return remote


def get_git_sha(commit='HEAD'):
    return get_git_repo().git.rev_parse(commit, short=True)
