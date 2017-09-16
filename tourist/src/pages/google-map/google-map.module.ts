import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GoogleMapPage } from './google-map';

@NgModule({
  declarations: [
    GoogleMapPage,
  ],
  exports: [
    GoogleMapPage
  ]
})
export class GoogleMapPageModule {}
