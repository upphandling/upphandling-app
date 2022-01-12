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

This is the mono repo for the [app](packages/app), built in React Native and our open [API](packages/api), built in Typescript and Loopback. You can also find our [landning page](../landing-page) in a separate repository.

## Install

```sh
cd packages/app
yarn install
yarn pod
```

## Usage

```sh
cd packages/app
yarn ios # or yarn android
```

## Deploy API

First make sure you are connected to the correct Kubernetes cluster. This command is run automatically for all commits in our main branch and builds and deploys code directly to our production cluster. Please look at [k8s](k8s) folder for more details about the infrastructure.

```sh
skaffold run
```

## Authors

👤 **Christian Landgren**

* Website: https://iteam.se
* Twitter: [@landgren](https://twitter.com/landgren)
* Github: [@irony](https://github.com/irony)
* LinkedIn: [@christian.landgren](https://linkedin.com/in/christian.landgren)

👤 **Johan Linåker**
* Twitter: [@johanlinaker](https://twitter.com/johanlinaker)

👤 **Ted Stalte**
* Website: https://www.staltec.se

## Show your support

Give a ⭐️ if this project helped you!
If you want to contribute, please contact any of us to be invited to our Discord or just send us an PR or create an Issue.
