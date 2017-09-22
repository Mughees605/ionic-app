import { Component,ViewChild } from '@angular/core';
import { MenuController, Nav, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth.service';
import { DashboardPage } from '../dashboard/dashboard';
import { PatientFormPage } from '../patient-form/patient-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  pages;
  loading: Loading;
  constructor(
    public navCtrl: NavController,
    public auth: Auth,
    public menu: MenuController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {

    this.pages = [
      { title: 'Patient-form', component: PatientFormPage },
      { title: 'Patient List', component: DashboardPage }
    ];
  }
  rootPage = DashboardPage;

  logout() {
    this.showLoading();
    this.auth.logout().then(() => {
      localStorage.removeItem('uid');
    }, (err) => {
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

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component)
  }


}
