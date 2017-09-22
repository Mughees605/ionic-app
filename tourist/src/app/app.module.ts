import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';

import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';

import { HomePage } from '../pages/home/home';
import { GoogleMapPage } from '../pages/google-map/google-map';
import { ModalAutocompletePage } from '../pages/modal-autocomplete/modal-autocomplete';
import { PhotosPage } from '../pages/photos/photos';

import {Signup} from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthData } from '../providers/auth-data';
import { ConnectivityProvider } from '../providers/connectivity/connectivity.ts';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps.ts';
import { LocationsProvider } from '../providers/locations/locations.ts';


@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    GoogleMapPage,
    ModalAutocompletePage,
      TabsPage,
      Login,
      Signup,
      PhotosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    ModalAutocompletePage,
      TabsPage,
      GoogleMapPage,
      Login,
      Signup,
      PhotosPage
  ],
  providers: [
    AuthData,
    StatusBar,
    SplashScreen, 
    Geolocation,
    ConnectivityProvider, GoogleMapsProvider, LocationsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
  ]
})
export class AppModule {}
