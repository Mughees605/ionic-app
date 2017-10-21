import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http"
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { GroupsPage } from '../pages/groups/groups';
import { GroupPage } from '../pages/group/group';
import { NewgroupsPage } from '../pages/newgroups/newgroups';
import { MembersPage } from '../pages/members/members';
import { GroupinfoPage } from '../pages/groupinfo/groupinfo';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '../providers/auth/auth.service';
import { GroupService } from '../providers/groups/groups.service';
import { NativeStorage } from '@ionic-native/native-storage';

import { enviroment } from '../enviroments/enviroments';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UsersProvider } from '../providers/users/users';
import { RequestProvider } from '../providers/request/request';
/*firebaser credentials*/
/**/
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    GroupinfoPage,
    GroupsPage,
    RegistrationPage,
    HomePage,
    DashboardPage,
    GroupPage,
    NewgroupsPage,
    MembersPage
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
    GroupPage,
    HomePage,
    GroupinfoPage,
    LoginPage,
    NewgroupsPage,
    RegistrationPage,
    DashboardPage,
    MembersPage,
    GroupsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Auth,
    GroupService,
    NativeStorage,
    UsersProvider,
    RequestProvider
  ]
})
export class AppModule { }
