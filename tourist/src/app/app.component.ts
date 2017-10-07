import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Login } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = Login;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAJUVixnpJEMoXuHzHfYNDTLk7-RDO0HY4",
        authDomain: "ng-http-452a4.firebaseapp.com",
        databaseURL: "https://ng-http-452a4.firebaseio.com",
        projectId: "ng-http-452a4",
        storageBucket: "ng-http-452a4.appspot.com",
        messagingSenderId: "32230195720"
      };
      firebase.initializeApp(config);


    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
