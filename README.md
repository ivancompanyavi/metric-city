# metric-city [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Metric City allows you to display metrics on a clean and accessible way using a city as template for it. This UI will provide you a generic engine where you can render any kind of metric

## Installation

This project **has no dependencies**. This means that in order for you to run this UI, you just need a modern browser (Firefox or Chrome) to run it. However, the project does have some dependencies for pure bundling and developing purposes. Tu run the installation you will need the right version of NPM, so it's recommended to use [NVM](https://github.com/nvm-sh/nvm) to be sure you have the right version of NPM.
```bash
nvm use     # takes the right version of NPM
npm install # installs NPM packages
```
To have everything ready

## Development

If you want to actively work on this project (welcome!), you just need to run
```bash
npm start # Starts a local server pointing localhost:8080
```

## Deployment

To release a new version of the project  you just need to run:
```bash
npm run deploy
```
That creates the bundled files using Webpack
