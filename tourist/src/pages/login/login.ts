import { Component } from '@angular/core';
import {
    IonicPage, NavController, NavParams, LoadingController,
    AlertController
} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { EmailValidator } from '../../validators/email';
import { AuthData } from '../../providers/auth-data';
// import {HomePage}from'../home/home';
import { HomePage } from '../home/home'

import { Signup } from '../signup/signup';
import firebase from 'firebase';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class Login {
    public loginForm;
    loading: any;

    constructor(public navCtrl: NavController, public navParams: NavParams
        , public formBuilder: FormBuilder,
        public alertCtrl: AlertController, public loadingCtrl: LoadingController,
        public authData: AuthData, public nav: NavController) {

        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });

    }

    ionViewDidLoad(){
        if(localStorage.getItem('user')){
            this.nav.setRoot(HomePage);
        }
    }

    loginUser(): void {
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        } else {
            this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
                this.loading.dismiss().then(() => {
                    localStorage.setItem('user',authData.uid);
                    this.nav.setRoot(HomePage);
                });
            }, error => {
                this.loading.dismiss().then(() => {
                    let alert = this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });

            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    }

    goToSignup(): void {
        this.nav.push(Signup);
    }
}
