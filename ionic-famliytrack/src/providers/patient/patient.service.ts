import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Patient } from './patient.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Observable } from  'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
const headers = new Headers({ "Content-Type": "application/json" });

@Injectable()
export class PatientProvider {
  patients: Patient[];
  allPatient = new Subject<any>();
  constructor(public http: Http, private db:AngularFireDatabase) {
  }

  addPatient(user: string, patient) {
    let item = this.db.list(`doctor/${user}`).push(patient)
    return item;
  };

  getSelectedDoctorPatients(did: string):Observable<any>{
   return this.db.list(`doctor/${did}`).valueChanges()
  };

  filterItems(patientTerm:string) {
    return this.patients && this.patients.filter((item) => {
      
      return item.firstname.toLowerCase().indexOf(patientTerm.toLowerCase()) > -1 || item.Date.indexOf(patientTerm) > -1;
    });
  }

}
