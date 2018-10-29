import os
import json

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


def env_file_to_dict(file):

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
