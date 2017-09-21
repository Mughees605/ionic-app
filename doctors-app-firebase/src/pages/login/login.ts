import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard'
import { RegistrationPage } from '../registration/registration'
import { NavController, Loading, AlertController, LoadingController } from 'ionic-angular';
import { Login } from '../../model/login.model';
import { Auth } from '../../providers/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth'
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registrationPage = RegistrationPage;
  @ViewChild('f') form: NgForm;

  constructor(
    private nav: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private auth: Auth) {

  }
  ionViewDidLoad(){
    let uid = localStorage.getItem('uid');
    if(uid){
      this.nav.setRoot(HomePage);
    }
  }

  public login(form: NgForm) {

    const { email, password } = form.value;

    let user = new Login(email, password);
    this.showLoading();
    this.auth.login(user).then((res) => {
      localStorage.setItem('uid', res.uid);
      this.nav.setRoot(HomePage);
    }, (err) => {
      this.showError(err.message)
    })
      .catch((err) => {
        this.showError(err.message)
      })
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
