import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PatientModel } from '../../model/patient.model';
import { PatientProvider } from '../../providers/patient/patient.service';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-patient-form',
  templateUrl: 'patient-form.html',
})
export class PatientFormPage {
  user_id: string;
  gender:string;
  @ViewChild('patientForm') form: NgForm

  constructor(
    public patientSer: PatientProvider,
    private afAuth: AngularFireAuth,
  ) {
  }

  ionViewDidLoad(){
     this.afAuth.authState.subscribe((user)=>{
       this.user_id = user.uid;
     })
  }

  savePatient(form: NgForm) {
    console.log(form.value);
    let { firstname, lastname, patientdis, patientmed, cost, Date, gender } = form.value;
    let Patient = new PatientModel(firstname, lastname, patientdis, patientmed, cost, Date, gender);
    this.patientSer.addPatient(this.user_id, Patient).then((res)=>{
      form.reset();
    },(err)=>{
      throw err;
    })
  }
}
