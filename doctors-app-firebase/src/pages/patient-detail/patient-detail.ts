import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Patient } from '../../providers/patient/patient.interface';

@Component({
  selector: 'page-patient-detail',
  templateUrl: 'patient-detail.html',
})
export class PatientDetailPage {
  private patientDetail:Patient;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.patientDetail = this.navParams.data;
  }

}
