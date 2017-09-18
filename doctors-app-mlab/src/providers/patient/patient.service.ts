import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Patient } from './patient.interface';
import { Subject } from 'rxjs/Subject';
const headers = new Headers({ "Content-Type": "application/json" });

@Injectable()
export class PatientProvider {
  patients: Patient[];
  patientChanged = new Subject<Patient[]>();

  constructor(public http: Http) {
  }

  addPatient(user: string, patient) {
    return this.http.post(`https://serene-refuge-41977.herokuapp.com/api/patient/add/${user}`, patient, { headers })
      .map((res) => {
        return res.json();
      })
      .catch((err) => err)
  };

  getSelectedDoctorPatients(did:string){
    return this.http.post(`https://serene-refuge-41977.herokuapp.com/api/doctor/${did}`, {headers})
    .take(1)
    .map((res)=>{
      return res.json();
    })
    .catch((err)=>err)
  };


}
