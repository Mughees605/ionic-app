import { Component, OnInit } from '@angular/core';
import { PatientProvider } from '../../providers/patient/patient.service';
import { Patient } from '../../providers/patient/patient.interface';
import { PatientDetailPage } from '../patient-detail/patient-detail';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage implements OnInit {
  patients:Patient[];
  patientDetail = PatientDetailPage;
  constructor(private patientService: PatientProvider) {
  }

  ngOnInit() {
    let did = localStorage.getItem('user');
    this.patientService.getSelectedDoctorPatients(did).subscribe((res) => {
      if (res.status) {
        this.patients = res.data;
      }
    })
  }


}
