import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Register } from '../../model/register.model';
import { Auth } from '../../providers/auth/auth.service';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  @ViewChild('registerForm') form:NgForm
  createSuccess = false;
  constructor(public nav: NavController, private alertCtrl: AlertController,private auth:Auth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  public register(form:NgForm) {

  const {email, password, doctors_id} = form.value;

  const newUser = new  Register(email,password,doctors_id);

    this.auth.signUp(newUser).then((res)=>{
       this.createSuccess = true;
      this.showPopup("Success", "AccountCreated")
    },
    (err)=>{
        this.createSuccess = false;
        this.showPopup("Error",'Problem creating account');
      }).catch((err)=>{
        this.showPopup("Error",err)
      })
     form.reset();
   }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
