# booking

Opusapp Booking Utility

# Admin

You can login to the admin with chris@opuslive.io / opusadmin.

# Deploy

## Automatic deploys

This app is deployed to staging environments automatically, and in 2 different ways.

First, whenever a PR is opened, CI will run tests against the newly opened branch. If they succeed, CI will build out fresh infrastructure to test on. To find the URL;

* Navigate to the PR page.
* Scroll down to the Checks section.
* There will be a check labeled `ci/circleci: deploy`. Click the details link.
* This brings you to the CircleCI job page.
* Scroll down, and expand the `Deploy to sandbox env` section.
* Scroll down, again. There's a lot of output here.
* The last object to be printed is the response of an Amazon API.
  * There will be section labeled `Outputs`. The `OutputValue` will be the hostname you can access your PR at.

After merging a PR, master will automatically be built out to [https://opus-stage.com](https://opus-stage.com).

## Cleanup

Closed PRs do not trigger cleanup of their infrastructure. Periodically, dangling cloudformation stacks will need to be deleted.

* Navigate to the [Cloudformation console](https://us-east-2.console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks?filter=active)

## To deploy manually

* Ensure that the requirements noted in `infra/requirements.txt` are installed.
* You'll need AWS credentials with correct permissions.

Then, from the root of this repo
```bash
./infra/deploy.py --env-file=infra/config/booking-stage.yml
```

## Manual production deployments

At the time of writing, there isn't an automatic production deployment method. Here's the manual steps;

#### Setup

* [Configure AWS keys](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).
* Navigate to the `infra` directory.
* Create a virtualenv (optional)
* Run `pip install`

To test your aws credentials you can run `aws iam list-account-aliases`. This should return an alias of `opusapps`.

#### Deploy

The current branch configuration has `master` being consistently deployed to opus stage, and `production` being deployed to production. Here are the steps for a production deploy;

* Have the team verify that master has all desired features for the build on opus stage.
* Compare `production` -> `master`. If there are changes (hotfixes), create a PR and sync those changes.
* If a PR was created to sync hotfixes, wait for that build to complete, and reconfirm stage with all changes.
* Create a PR from `master` -> `production`
* Confirm all changes are present in that PR.
* Tests will run for this PR. Wait for them to complete.
* Once tests are green, run the following;
```bash
./infra/deploy.py --env-file=infra/config/booking-prod.yml
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

The app will be hosted at either `localhost` or `192.168.99.100`.

### Common Issues

As teammates update this repo, you'll need to take a few steps to ensure your local environment is up to date. After pulling in code from others, be sure to look for new different dependencies (`requirements.txt`) new configuration (in the `.env`). Changes to either will require some action your part. If you encounter errors after pulling, especially `<package> not found` or config errors, one of these steps should help you resolve the issue.

* Rebuild your containers, to get new dependencies. (`docker-compose build`)
* Stop, remove and start to get new env variables. (`docker-compose stop && docker-compose rm && docker-compose up`)

If you get any of the following errors when running `docker-compose up`, try the suggested solutions.
* `[ERROR] InnoDB: Operating system error number 22 in a file operation.` Remove `docker-compose.override.yaml`. (Note that if you do this, every time you run `docker-compose down`, any data you've written will be gone; consider running `docker-compose stop` instead.)
* `[ERROR] --initialize specified but the data directory has files in it. Aborting.` Run `rm -r mysql-data`. (This file is gitignored.)
*  `_mysql_exceptions.OperationalError: (2059, "Authentication plugin 'caching_sha2_password' cannot be loaded: /usr/lib/mysql/plugin/caching_sha2_password.so: cannot open shared object file: No such file or directory")` Change `mysql:latest` to `mysql:5.7` in `docker-compose.yaml`.


### Modals (Dialog)

TL;DR
- import a dialog component `import { Dialog } from './Dialog`.
- wrap your component with the Dialog component ` export default Dialog(YourComponent)`.
- use `this.props.openDialog(<div/>)` from within `YourComponent` to launch a some content in a Dialog.

Dialogs can be implemented using the Dialog decorators (higher-order components) located in `components/Dialog`. Dialogs can be composed into the component that will be responsible for launching the Dialog. The composed component will receive the `openDialog` and `closeDialog` props. The `openDialog` function takes one react node as an argument that will be rendered as the content of the Dialog.

A standard dialog that is used in many places in this repo is the default Dialog. Let's look at an example.

```
import React, { Component } from 'react';
import { compose } from 'redux';
import { Dialog } from './Dialog';


class UserPage extends Component {

    onClick() {
        this.props.openDialog(
            <div>
                <p>I'm in the modal!</p>
            </div>
        )
    }

    render () {
        <Button onClick={this.onClick} />
    }

}

export default Dialog(UserPage)

// or if you may have additional decorators
export default compose(
    Dialog
)(UserPage)
```

### Adding a new Dialog

The Dialog state manager located at `components/Dialog/DialogStateManager.js` is a curried component whose first argument is a Dialog component. The Dialog component defaults to `DialogBase`. You can create a new Dialog component from `DialogBase` adding additional functionality or styles and compose in `DialogStateManager` to the new component, similar to the implementation of the default Dialog in `Dialog.js`.

# Assets

Currently, all of our scss files live in `booking/assets/scss`. Briefly, there
2 completely different sets of scss; one for the artist profile, and one for the
homepage / marketing site. There are a few historical reasons for them being
separate;

* It was originally intended that they would be separate designs, and ne'er the
twain shall meet.
* Artist Profile and Homepage were separate projects built out by
[PSD2HTML](https://www.psd2html.com/), hence the two separate sets of files.

Artist Profile scss files live at `booking/assets/scss`, excluding the
`booking/assets/scss/home` directory. The scss entry point is
`booking/assets/scss/artist-profile.scss`

Homepage files live at `booking/assets/scss/home`. The scss entry point is
`booking/assets/scss/home/main.scss`.

ATM, this isn't ideal, as it's a confusing structure, and we may wind up
combining styles. We have a few options. One is to change the folder structure
to place home and artist-profile sass files next to each other. Another is to
thoroughly audit for shared styles and combine.

## Sass pipeline

Our sass files are processed by a Django app called
[django-sass-processor](https://github.com/jrief/django-sass-processor). With
DEBUG on (running locally), the `sass_src` tag will regenerate css from the sass
source every request. However, in stage/prod, we use the `compilescss` command
at startup to generate css. Since the generated css files which eventually live
in `booking/static/scss` are generated, we ignore them, to prevent devs from
making changes to the generated files.

# Fixtures

This app comes with some default data for testing. To add to it, you can use the following commands. (`pbcopy` is mac-specific).

```bash
# booking/fixtures/home.opususer.json
docker-compose exec web ./manage.py dumpdata home account | pbcopy

# booking/fixtures/musicians.json
docker-compose exec web ./manage.py dumpdata musicians | pbcopy

# booking/fixtures/venues.venue.json
docker-compose exec web ./manage.py dumpdata venues | pbcopy
```
