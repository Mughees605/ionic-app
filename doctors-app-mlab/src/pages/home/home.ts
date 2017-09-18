import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, Nav, NavController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth.service';
import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
import { PatientFormPage } from '../patient-form/patient-form';
import { PatientSearchPage } from '../patient-search/patient-search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  @ViewChild(Nav) nav: Nav;
  pages;

  constructor(public navCtrl: NavController, public auth: Auth, public menu: MenuController) {

    this.pages = [
      { title: 'Patient-form', component: PatientFormPage },
      { title: 'Patient-Search', component: PatientSearchPage },
      { title: 'Patient List', component: DashboardPage}
    ];
  }
  rootPage = DashboardPage;

  ngOnInit() {
  }

  logout() {
    this.auth.logout().subscribe((res) => {
      if (res.status && res.status == 200) {
        this.navCtrl.setRoot(LoginPage);
      }
    })
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component)
  }


}
