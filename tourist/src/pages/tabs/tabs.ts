import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
import { GoogleMapPage } from '../google-map/google-map';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GoogleMapPage;
  tab3Root = ContactPage;

  constructor() {

  }
}