import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController, Content, Events } from 'ionic-angular';
import { GroupService } from '../../providers/groups/groups.service';
import { MembersPage } from '../members/members';
import { GroupinfoPage } from '../groupinfo/groupinfo'; 

@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  owner: boolean = false;
  uid: string;
  group;
  groupId;
  groupName;
  groupmembers;
  constructor(public navCtrl: NavController, public navParams: NavParams, public groupservice: GroupService,
    public actionSheet: ActionSheetController, public events: Events, public loadingCtrl: LoadingController) {

    this.group = this.navParams.get('group');
    this.groupId = this.group.groupid;
    this.groupName = this.group.groupName;
  }

  ionViewDidLoad() {
    this.groupservice.getownership(this.groupId).then((res) => {
      if (res)
       {
        this.owner = true;
        this.groupmembers = this.groupservice.currentgroup;
      console.log(this.groupmembers)
      
       }
        else{
          this.groupservice.getgroupmembers();
        }
    }).catch((err) => {
      alert(err);
    })

    this.events.subscribe('gotmembers', () => {
      this.groupmembers = this.groupservice.currentgroup;
    })

  }

  presentOwnerSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Add member',
          icon: 'person-add',
          handler: () => {
            this.navCtrl.push(MembersPage, {groupName:this.groupName});
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
            this.navCtrl.push(GroupinfoPage, { group:this.group});
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

  presentMemberSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Leave Group',
          icon: 'log-out',
          // handler: () => {
          //   this.groupservice.leavegroup().then(() => {
          //     this.navCtrl.pop();
          //   }).catch((err) => {
          //     console.log(err);
          //   })
          // }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('GroupinfoPage', {groupName: this.groupName});
          }
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
