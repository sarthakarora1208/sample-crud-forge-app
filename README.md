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
