import { Component } from '@angular/core';
import { NavController, Loading, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  loading: Loading;
  user_id: string;
  searchTerm: string = '';
  constructor(
     private loadingCtrl: LoadingController,
    private nav: NavController,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe((user: any) => {
      if (!user) {
        this.nav.setRoot(LoginPage);
      }
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }


}
