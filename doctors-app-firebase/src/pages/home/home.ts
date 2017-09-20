import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
import { PatientFormPage } from '../patient-form/patient-form';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    pages;
    loading: Loading;

    @ViewChild(Nav) nav: Nav;

    constructor(
        public navCtrl: NavController,
        public authData: AuthData,
        public menu: MenuController,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) {
        this.pages = [
            { title: 'Patient-form', component: PatientFormPage },
            { title: 'Patient List', component: DashboardPage }
        ];
    }
    logout() {
        this.showLoading();
        this.authData.logoutUser().then(() => {
            this.navCtrl.setRoot(Login);
        }).catch((err) => {
            return err
        })
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }


    openPage(page) {
        this.menu.close();
        this.nav.setRoot(page.component)
    }
}
