import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HomePage } from '..//home/home'
import { RegistrationPage } from '../registration/registration'
import { NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { Login } from '../../model/login.model';
import { Auth } from '../../providers/auth/auth.service';

import { } from ''

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registrationPage = RegistrationPage;
  @ViewChild('f') form: NgForm;

  constructor(private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private auth: Auth) { }



  public login(form: NgForm) {

    const { email, password } = form.value;

    let user = new Login(email, password);
    this.showLoading();
    this.auth.login(user).subscribe((res)=>{
       if(res.status){
         this.nav.setRoot(HomePage);
       }
       else {
         this.showError("Access Denied");
       }
    },
    err=>{
      this.showError("Access Denied");
    })
    form.reset();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
