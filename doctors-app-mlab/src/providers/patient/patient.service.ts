import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
const headers = new Headers({ "Content-Type": "application/json" });

@Injectable()
export class PatientProvider {

  constructor(public http: Http) {
    console.log('Hello PatientProvider Provider');
  }

  addPatient(user: string, patient) {
    return this.http.post(`https://serene-refuge-41977.herokuapp.com/api/patient/${user}`, patient, { headers })
      .map((res) => {
        return res.json();
      })
      .catch((err) => err)
  }


}
