import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { RequestProvider } from '../../providers/request/request';
import { connreq } from './members.interface';
@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
})
 
export class MembersPage {
  temparr = [];
  newrequest = {} as connreq;  
  filteredusers = [];
  constructor(public reqService:RequestProvider, public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams, public userService: UsersProvider) {
    this.userService.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
    })
  }


  searchUser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  sendreq(recipient) {
    this.newrequest.sender = localStorage.getItem('uid');
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient)
      alert('You are your friend always');
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['ok']
      });
    
      this.reqService.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      },(err)=>{
        alert(err);
      })
    }
  }




}
