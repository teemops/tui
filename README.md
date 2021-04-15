![Teemops GIF](https://raw.githubusercontent.com/teemops/assets/master/teemops-scg-gif.mp4.gif)
# tui

tui is short code for Teemops UI V2.

The first UI for tui is SCG - Simple Cloud Generator
Simple Cloud Generator can be run at https://app.teemops.com or by downloading the source and following the instructions below.


## Dev Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Deployment

Deployment can be done by using docker for the ansible controller.

Using VS Code Remote Containers is the most simple because it will build the docker environment and all Ansible / Python requirements for deployment artifacts

- First modify the deploy/vars/customers/scg.yml file to be envirnoment specific (see scg.sample.yml)
- You'll need to manually set up an SSL cert if you want to deploy,
- The deployment will deploy Tui into an S3 bucket with CloudFront.

```
cd deploy
sh deploy.sh

```
