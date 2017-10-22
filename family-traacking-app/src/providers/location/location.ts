import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs';
import firebase from 'firebase';
@Injectable()
export class LocationTracker {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  constructor( public geoLoc: Geolocation) {

  }
  
  currentPosition(): Observable<any> {
    return this.geoLoc.watchPosition()
  }
  
}