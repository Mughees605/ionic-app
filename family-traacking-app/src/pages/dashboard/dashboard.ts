import { Component } from '@angular/core';
import { NavController, Loading, AlertController, LoadingController, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { RequestProvider } from '../../providers/request/request';
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  loading: Loading;
  user_id: string;
  searchTerm: string = '';
  myrequests;
  constructor(
     private loadingCtrl: LoadingController,
    private nav: NavController,
    public events:Events,
    private afAuth: AngularFireAuth,
    public reqService:RequestProvider,
    private alertCtrl: AlertController) {

  }

  ionViewWillEnter() {
    // this.afAuth.authState.subscribe((user: any) => {
    //   if (!user) {
    //     this.nav.setRoot(LoginPage);
    //   }
    // });
    this.reqService.getmyrequests();
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.reqService.userDetails;
      console.log(this.myrequests)
    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }


}
