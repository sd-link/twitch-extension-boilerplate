# Streamlabs Extension Boilerplate

## Setup

#### Create the extension on Vulcan
Before work starts, your extension needs to be created on [Vulcan](https://vulcan.curseforge.com). While in development, your Twitch ID will need to be whitelisted in order to see/test the extension. **For the time being, please work with Tom to complete this step.**
#### Environment Setup

##### 1. update your host file
```
127.0.0.1 extensions.streamlabs.dev
```

##### 2. generate ssl certs
``` bash
sh ./certs/generate.sh
```

##### 3. initialize dependencies

``` bash
yarn
```

## Develop

Testing will take place on twitch.tv, and also will require your Twitch user to be streaming as well if you're working on an overlay extension (panel extensions should load regardless).

Head over to the Extensions Dashboard at [twitch.tv/YOUR_TWITCH_USERNAME/dashboard/extensions](https://twitch.tv/YOUR_TWITCH_USERNAME/dashboard/extensions) and install your extension, and then activate it. Once activated, you can visit your channel page at [twitch.tv/YOUR_TWITCH_USERNAME](https://twitch.tv/YOUR_TWITCH_USERNAME) to test.

```
npm run dev
```

Once `dev` is running, your extension will have the following pages:

```
https://extensions.streamlabs.dev:8080/viewer.html
Renders for the viewer, either in a panel or in the video overlay depending on the type of extension.

https://extensions.streamlabs.dev:8080/config.html
Render for the broadcaster when configuring the extension.

https://extensions.streamlabs.dev:8080/live-config.html
Render for the broadcaster in the Twitch "Live" Dashboard while streaming.
```

These pages will most likely not work correctly if you manually open them in their browser, they should be tested on twitch.tv. **Again, only Twitch IDs that have been whitelisted will be able to see and test your extension while it is in development.**

## Production
Once your extension is ready for others to test and/or go live, we need to bundle it up.

```npm run vulcan```

This will bundle all of the assets into `releases/vulcan.zip` which can be uploaded to [Vulcan](https://vulcan.curseforge.com). **For the time being, please work with Tom to complete this step.**
