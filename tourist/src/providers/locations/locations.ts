import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocationsProvider {
  placeChanged = new Subject<any>();
  latLng = { lat: 0, lng: 0 };

  constructor(public geoLoc: Geolocation) {
  }

  currentPosition(): Observable<any> {
    return Observable.fromPromise(this.geoLoc.getCurrentPosition())
      .map((res) => res)
      .catch((err) => err)
  }

  selectedPlace(place){
    console.log('place');
    this.placeChanged.next(place);
  } 

}
