import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { NewgroupsPage } from '../newgroups/newgroups';
import { GroupPage } from '../group/group';
import { GroupService  } from '../../providers/groups/groups.service';
import { LocationTracker } from '../../providers/location/location';
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage implements OnInit{

  constructor(public locationTracker:LocationTracker, public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public loadingCtrl: LoadingController, public groupService:GroupService) {
  }
  allMyGroups = []
  
  ngOnInit(){
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
  ionViewWillEnter() {
    this.start();
    console.log(this.locationTracker.lat)
  }

  addGroup(){
    this.navCtrl.push(NewgroupsPage);
  }
  
  openGroup(group) {
    console.log(group)
    this.groupService.getintogroup(group.groupid);
    this.navCtrl.push(GroupPage, { group: group });

  }

  start(){
    this.locationTracker.startTracking();
  }

  stop(){
    this.locationTracker.stopTracking();
  }
}
