import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, Nav, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth.service';
import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
import { PatientFormPage } from '../patient-form/patient-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  @ViewChild(Nav) nav: Nav;
  pages;
  loading:Loading;
  constructor(
    public navCtrl: NavController, 
    public auth: Auth, 
    public menu: MenuController,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController
  ) {

    this.pages = [
      { title: 'Patient-form', component: PatientFormPage },
      { title: 'Patient List', component: DashboardPage}
    ];
  }
  rootPage = DashboardPage;

  ngOnInit() {
  }

  logout() {
    this.showLoading();    
    this.auth.logout().subscribe((res) => {
      if (res.status && res.status == 200) {
        this.navCtrl.setRoot(LoginPage);
      }
      else{
        this.showError('No Internet Connection')
      }
    },(err)=>{
      this.showError(err);
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
