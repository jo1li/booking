# booking

Opusapp Booking Utility

# Admin

You can login to the admin with chris@opuslive.io / opusadmin.

# Deploy

```bash
echo "y" | gcloud app deploy app.yaml --project opus-booking-stage
```

# A note on templates

This project is likely to go through many iterations of design. To accommodate
building and testing those iterations, be sure to use `opus_render` from the
backend.utils instead of the builtin Django `render()` method. `opus_render`
allows us to toggle between different design versions via GET param, with a
clean fallback.

# Development

Install [Docker](https://www.docker.com/). The easiest option for installing Docker is [Docker for Mac](https://docs.docker.com/docker-for-mac/). This will provide Docker for Mac, `docker-compose` and `docker-machine`. However, depending on your machine, `docker-machine` may be a better choice. If you experience long waits for containers to come up, then `docker-machine` may serve you better.

## Additional docker-machine steps

Follow the [installation steps for Docker Machine](https://docs.docker.com/machine/install-machine/). It's also helpful to ensure you're on the most recent version of [VirtualBox](https://www.virtualbox.org/wiki/Downloads).

First you want to create the virtual machine that's going to host your containers:

```bash
docker-machine create opus
```
This will create a new VirtualBox VM. Wait for it to finish.

Next is the command to configure your Docker client to communicate with your `docker-machine` VM;

```bash
eval $(docker-machine env opus)
```

From now on in this terminal session, all your docker commands will refer to the new Linux VM you just created. If you start a new terminal session, you'll need to re-run that command to issue docker commands.

## Use docker-compose to run services.

Before you can successfully run our containers, ensure there is a file named `.env` at the root of the repo. It will contain all the configuration to start the app. However, it does not contain secrets for third party services. You'll need to retrieve them from a secrets store. Ask whomever set you up with this repo for access.

We're ready to spin our containers up!

```bash
docker-compose up
```
The first time might take a while. Docker will pull the latest [images](https://docs.docker.com/glossary/?term=image) onto your machine and run them.

Run `docker-compose ps` to list your running containers.

View logs by running `docker-compose logs <service>` where the last parameter is the name of the [docker-compose service](https://docs.docker.com/compose/compose-file/compose-file-v2/#service-configuration-reference) you want to see logs for. You can leave off the parameter if you'd like to see logs for all services.

To follow along with logs like `tail -f`, run `docker-compose logs -f <service>`.

To open a shell to the web container, run `docker-compose exec web /bin/bash`

### Common Issues

As teammates update this repo, you'll need to take a few steps to ensure your local environment is up to date. After pulling in code from others, be sure to look for new different dependencies (`requirements.txt`) new configuration (in the `.env`). Changes to either will require some action your part. If you encounter errors after pulling, especially `<package> not found` or config errors, one of these steps should help you resolve the issue.

* Rebuild your containers, to get new dependencies. (`docker-compose build`)
* Stop, remove and start to get new env variables. (`docker-compose stop && docker-compose rm && docker-compose up`)
