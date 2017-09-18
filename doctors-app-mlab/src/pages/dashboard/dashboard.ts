import { Component, OnInit } from '@angular/core';
import { PatientProvider } from '../../providers/patient/patient.service';
import { Patient } from '../../providers/patient/patient.interface';
import { PatientDetailPage } from '../patient-detail/patient-detail';
import { NavController, Loading, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage} from '../login/login';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage implements OnInit {
  loading:Loading;
  searchTerm: string = '';
  patients: Patient[];
  patientDetail = PatientDetailPage;
  constructor(
    private patientService: PatientProvider, 
    private nav: NavController, 
    private alertCtrl:AlertController) {
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
    },(err)=>{
       this.showError(err);
    })
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  setFilteredItems() {
    this.patients = this.patientService.filterItems(this.searchTerm);
  }


}
