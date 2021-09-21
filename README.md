## SAMPLE CRUD FORGE APP

This is an example [Forge](https://developer.atlassian.com/platform/forge/) app that updates a Jira issue using fake data we get from an external API inside a modal.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

Once you have logged into the CLI (`forge login`), follow the steps below to install the app onto your site:

1. Run `git clone https://github.com/sarthakarora1208/sample-crud-forge-app.git` to clone the repository.

2. Run `cd sample-crud-forge-app` to change the directory.

3. Run `npm run setup`. This command will bundle the our two static web applications (<em>static/main-app</em> && <em>static/wrapper-app</em>) together with the custom UI bridge, into the <em>static/main-app/build</em> & <em>static/wrapper-app/build</em> directory, which is used as the resource path in the Forge app's <em>manifest.yml</em>
4. Run `forge register` to register a new copy of this app to your developer account
5. Run `forge deploy` to deploy the app into the default environment
6. Run `forge install` and follow the prompts to install the app

## Usage

Press the 'Open Sample App' button on the issue pannel to get started with our app.

![11](https://user-images.githubusercontent.com/42542489/134235857-4b47a9a1-3be1-413a-a292-18422d47f817.gif)

This app is designed as a Forge reference example for developers.

## Debugging

1. Run `cd static/main-app && npm run start` to start the <em>main-app<em>

2. Run `cd static/wrapper-app && npm run start` to start the <em>wrapper-app<em>

3. Run the [`forge tunnel`](https://developer.atlassian.com/platform/forge/change-the-frontend-with-forge-ui/#set-up-tunneling) command to run your Forge app locally.
