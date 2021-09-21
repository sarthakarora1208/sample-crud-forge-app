## SAMPLE CRUD FORGE APP

If you haven't logged in already login using

```
forge login
```

For a more detailed explaination visit https://developer.atlassian.com/platform/forge/getting-started/#log-in-with-an-atlassian-api-token

To get started, clone the repository and change the directory into the sample-crud-forge-app.

```
git clone https://github.com/sarthakarora1208/sample-crud-forge-app.git
cd sample-crud-forge-app
```

```
npm run setup
```

This command will bundle the our two static web applications (static/main-app && static/wrapper-app) together with the custom UI bridge, into the static/main-app/build && static/wrapper-app/build directory, which is used as the resource path in the Forge app's manifest.yml.

The setup command installs the dependencies for both the react works.

To register the app with forge.

```
forge register
```

To deploy the app to forge's servers

```
forge deploy
```

To install the app to your domain. You'll have to setup https://developer.atlassian.com/platform/forge/getting-started/#set-up-an-atlassian-cloud-developer-site

```
forge install
```


## SAMPLE CRUD CUSTOM UI FORGE APP


This is an example [Forge](https://developer.atlassian.com/platform/forge/) app that translates updated Jira issue fields( summary and description) contents using forge resolver functions. 

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

Once you have logged into the CLI (`forge login`), follow the steps below to install the app onto your site:

1. Clone this repository
2. Run `forge register` to register a new copy of this app to your developer account
3. Run `npm install` to install your dependencies
4. Run `forge deploy` to deploy the app into the default environment
5. Run `forge install` and follow the prompts to install the app

## Usage

Press the corresponding button on the issue pannel to get started with our app.

![Animation of translate issue content panel](./demo.gif)

This app is designed as a Forge reference example for developers. 


## Debugging

You can enable verbose logging by setting the `DEBUG_LOGGING` [environment variable](https://developer.atlassian.com/platform/forge/environments/) to `1`. Logs can then be viewed with the `forge logs` command.

Alternatively, you can use the [`forge tunnel`](https://developer.atlassian.com/platform/forge/change-the-frontend-with-forge-ui/#set-up-tunneling) command to run your Forge app locally. 

