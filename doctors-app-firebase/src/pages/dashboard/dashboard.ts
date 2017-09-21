import { Component } from '@angular/core';
import { PatientProvider } from '../../providers/patient/patient.service';
import { Patient } from '../../providers/patient/patient.interface';
import { PatientDetailPage } from '../patient-detail/patient-detail';
import { NavController, Loading, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database'
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  loading: Loading;
  user_id: string;
  searchTerm: string = '';
  patients: Patient[];
  patientDetail = PatientDetailPage;
  constructor(
    private patientService: PatientProvider,
    private nav: NavController,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController) {

  }

  ionViewDidLoad(){
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if(!user){
        this.nav.setRoot(LoginPage);
      }
      else{
         this.patientService.getSelectedDoctorPatients(user.uid).subscribe((res)=>{
           this.patients = res
         })
      }
    });
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
