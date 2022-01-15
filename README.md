<h1 align="center">Welcome to Upphandling.app 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/landgren" target="_blank">
    <img alt="Twitter: landgren" src="https://img.shields.io/twitter/follow/landgren.svg?style=social" />
  </a>
</p>

> The best way to procure open source software

### 🏠 [Homepage](https://upphandling.app)

### 🤖 [API](https://api.upphandling.app/explore)

<img src="https://upphandling.app/assets/images/show-dis.png" width="25%"/>

This is the mono repo for the [app](packages/Upphandling), built in React Native and our open [API](packages/api), built in Typescript and Loopback. You can also find our [landning page](../landing-page) in a separate repository.

# App development

Here's a quick start!

## Install app dependencies

```sh
cd packages/Upphandling
yarn install
yarn pod
```

## Running the app

```sh
cd packages/Upphandling
yarn ios # or yarn android
```

# API development

[Go read the API README](/packages/api)

## Deploy API

First make sure you are connected to the correct Kubernetes cluster. This command is run automatically for all commits in our main branch and builds and deploys code directly to our production cluster. Please look at [k8s](k8s) folder for more details about the infrastructure.

```sh
skaffold run
```

## Secrets

In the .secrets folder we need to have these files put in place:
**It should go without saying, but these files may never be committed to the repo.**

```
GoogleService-Info.plist # Google Service Keys for ios FCM integration
```

## Authors

👤 **Christian Landgren**

- Website: https://iteam.se
- Twitter: [@landgren](https://twitter.com/landgren)
- Github: [@irony](https://github.com/irony)
- LinkedIn: [@christian.landgren](https://linkedin.com/in/christian.landgren)

👤 **Johan Linåker**

- Twitter: [@johanlinaker](https://twitter.com/johanlinaker)

👤 **Ted Stalte**

- Website: https://www.staltec.se

👤 **Stefan Wallin**

- Website: https://stefan-wallin.se
- Twitter: [@Stefan_Wallin](https://twitter.com/Stefan_Wallin)
- Github: [@StefanWallin](https://github.com/StefanWallin)
- LinkedIn: [@stefanwallin](https://www.linkedin.com/in/stefanwallin/)

## Show your support

Give a ⭐️ if this project helped you!
If you want to contribute, please contact any of us to be invited to our Discord or just send us an PR or create an Issue.
