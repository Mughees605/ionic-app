import { Component } from '@angular/core';
import { NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { NewgroupsPage } from '../newgroups/newgroups';
import { GroupService  } from '../../providers/groups/groups.service';
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public loadingCtrl: LoadingController, public groupService:GroupService) {
  }
  allMyGroups = []
  
  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Getting your groups, Please wait...'
    });
    loader.present();
    this.groupService.getmygroups();
    loader.dismiss();
    this.events.subscribe('newgroup', () => {
      this.allMyGroups = this.groupService.myGroups;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('newgroup');
  }
  addGroup(){
    this.navCtrl.push(NewgroupsPage);
  }

}
