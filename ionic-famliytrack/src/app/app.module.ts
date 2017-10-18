import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http"
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { HomePage } from '../pages/home/home';
import { PatientFormPage } from '../pages/patient-form/patient-form';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { PatientDetailPage } from '../pages/patient-detail/patient-detail'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '../providers/auth/auth.service';
import { PatientProvider } from '../providers/patient/patient.service';
import { NativeStorage } from '@ionic-native/native-storage';

import { enviroment } from '../enviroments/enviroments';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
/*firebaser credentials*/
/**/
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegistrationPage,
    HomePage,
    PatientFormPage,
    DashboardPage,
    PatientDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(enviroment.firebase,),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    DashboardPage,
    PatientFormPage,
    PatientDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Auth,
    PatientProvider,
    NativeStorage
  ]
})
export class AppModule { }
