import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Auth } from '../auth/auth.service'
const headers = new Headers({ "Content-Type": "application/json" });

@Injectable()
export class PatientProvider {

  constructor(public http: Http,public auth:Auth) {
    console.log('Hello PatientProvider Provider');
    this.auth.user.subscribe((res=>{console.log(res)}))
 }

  addPatient(user: string) {

    console.log(user);
    // return this.http.post(`https://serene-refuge-41977.herokuapp.com/api/patient${user}`, user, { headers })
    //   .map((res) => {
    //     console.log(res);
    //     return res.json();
    //   })
  }


}
