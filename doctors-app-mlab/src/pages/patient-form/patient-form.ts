import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PatientModel } from '../../model/patient.model';
import { PatientProvider } from '../../providers/patient/patient.service';

@Component({
  selector: 'page-patient-form',
  templateUrl: 'patient-form.html',
})
export class PatientFormPage {
  user: string;
  @ViewChild('patientForm') form: NgForm

  constructor(
    public patientSer: PatientProvider,
  ) {
  }

  savePatient(form: NgForm) {
    let user = localStorage.getItem('user');
    let { firstname, lastname, patientdis, patientmed, cost, Date, gender } = form.value;
    let Patient = new PatientModel(firstname, lastname, patientdis, patientmed, cost, Date, gender);
    this.patientSer.addPatient(user, Patient).subscribe((res) => {
      if (res.status) {
        this.form.reset();
      }
      else {
        alert(res.status)
      }
    });
  }
}
