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
    rootPage: any = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyC-UapMzsEcIwcm9bv04z8-90YqJPVSwrU",
            authDomain: "doctors-app-b4c61.firebaseapp.com",
            databaseURL: "https://doctors-app-b4c61.firebaseio.com",
            projectId: "doctors-app-b4c61",
            storageBucket: "",
            messagingSenderId: "1081323449750"
        };
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged((user) => {

            if (!user) {
                console.log("not login");
                this.rootPage = Login;


            } else {
                console.log("login");
                this.rootPage = HomePage;

            }

        });

        platform.ready().then(() => {
            
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}
