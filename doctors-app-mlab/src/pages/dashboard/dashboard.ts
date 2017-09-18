import { Component, OnInit } from '@angular/core';
import { PatientProvider } from '../../providers/patient/patient.service';
import { Patient } from '../../providers/patient/patient.interface';
import { PatientDetailPage } from '../patient-detail/patient-detail';
import { NavController } from 'ionic-angular';
import { LoginPage} from '../login/login';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage implements OnInit {
  searchTerm: string = '';
  patients: Patient[];
  patientDetail = PatientDetailPage;
  constructor(private patientService: PatientProvider, private nav: NavController) {
  }

  ionViewDidLoad(){
    let user = localStorage.getItem('user');
    if(!user){
      this.nav.setRoot(LoginPage);
    }
  }

  ngOnInit() {
    let did = localStorage.getItem('user');
    this.patientService.getSelectedDoctorPatients(did).subscribe((res) => {
      if (res.status) {
        this.patients = res.data;
      }
    })
  }

  setFilteredItems() {
    this.patients = this.patientService.filterItems(this.searchTerm);
  }


}
