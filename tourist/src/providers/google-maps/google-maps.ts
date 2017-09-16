import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleMapsProvider {

  constructor(public http: Http) {
    console.log('Hello GoogleMapsProvider Provider');
  }

}
