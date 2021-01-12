Tweet Seeker WEB
====================

This frontend application responds to the requeriments of streaming public tweets.

The app is developed in Angular 9 using socket.io for living communication with the api server. Also uses the redux pattern through ngrx libs.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

The app has been developing for training purposes.

### Demo

Demo application deployed on Firebase. Check out here: (https://tweetseekerapi-okppg.web.app)

### Install packages and globals

`$ npm install`

### Development server

Run `npm start` for launching dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. 

#### Angular: Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)


### Environment configuration

Currenty only one configuration is enabled: demo. This configuration replace the default environment file with the environment.[cfg] file, both stored in `environments/` folder.
For deploying the webapp make sure you have configured correctly the config associated file (api base url, api path, etc.)

`$ng build --configuration=demo`

