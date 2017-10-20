import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController, Content, Events } from 'ionic-angular';
import { GroupService } from '../../providers/groups/groups.service';
import { MembersPage } from '../members/members';

@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  owner: boolean = false;
  uid: string;
  groupName;
  constructor(public navCtrl: NavController, public navParams: NavParams, public groupservice: GroupService,
    public actionSheet: ActionSheetController, public events: Events, public loadingCtrl: LoadingController) {

    this.groupName = this.navParams.get('groupName');
    this.groupservice.getownership(this.groupName).then((res) => {
      if (res)
        this.owner = true;
    }).catch((err) => {
      alert(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPage');
  }

  presentOwnerSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Add member',
          icon: 'person-add',
          handler: () => {
            this.navCtrl.push(MembersPage);
          }
        },
        {
          text: 'Remove member',
          icon: 'remove-circle',
          handler: () => {
            this.navCtrl.push('GroupmembersPage');
          }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('GroupinfoPage', { groupName: this.groupName });
          }
        },
        {
          text: 'Delete Group',
          icon: 'trash',
          // handler: () => {
          //   this.groupservice.deletegroup().then(() => {
          //     this.navCtrl.pop();
          //   }).catch((err) => {
          //     console.log(err);
          //   })
          // }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }
}
