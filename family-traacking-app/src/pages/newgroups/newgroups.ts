import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GroupService } from '../../providers/groups/groups.service';

@Component({
  selector: 'page-newgroups',
  templateUrl: 'newgroups.html',
})
export class NewgroupsPage {
  newgroup = {
    groupName: 'GroupName',
    groupPic: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, public groupservice:GroupService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewgroupsPage');
  }

  creategroup() {
    let groupId = this.makeid();
    this.newgroup['groupId'] = groupId; 
    alert('groupId is '+ groupId);
    this.groupservice.addgroup(this.newgroup).then(() => {
      this.navCtrl.pop();
    }).catch((err) => {
      alert(JSON.stringify(err));
    })
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
    
  editgroupname() {
    let alert = this.alertCtrl.create({
      title: 'Edit Group Name',
      inputs: [{
        name: 'groupname',
        placeholder: 'Give a new groupname'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'Set',
        handler: data => {
          if (data.groupname) {
            this.newgroup.groupName = data.groupname
          }

          else {
            this.newgroup.groupName = 'groupName';
          }
        }
      }
      ]
    });
    alert.present();
  }
}
