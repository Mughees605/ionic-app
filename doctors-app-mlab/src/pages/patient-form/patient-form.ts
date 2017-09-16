import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';
import { PatientModel } from '../../model/patient.model';
import { PatientProvider } from '../../providers/patient/patient.service';
import { Auth } from '../../providers/auth/auth.service'
@Component({
  selector: 'page-patient-form',
  templateUrl: 'patient-form.html',
})
export class PatientFormPage implements OnInit{
  user:string;
  @ViewChild('patientForm') form: NgForm

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public patientSer:PatientProvider,
    public authSer: Auth
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientFormPage');
  }

  ngOnInit(){
    console.log(this.authSer.username);
    // this.authSer.user.subscribe((res)=>{
    //   console.log(res);
    //  this.user = res;
    // })
  }

  savePatient(form:NgForm){
   let {firstname, lastname, patientdis, patientmed, cost, Date } = form.value;
   let Patient = new PatientModel(firstname, lastname, patientdis, patientmed, cost, Date);
   console.log(this.user)
   this.patientSer.addPatient(this.user);
  }
}
