import { Component } from '@angular/core';
import { NavController, NavParams,Events } from 'ionic-angular';
import { GroupService } from '../../providers/groups/groups.service';
@Component({
  selector: 'page-groupinfo',
  templateUrl: 'groupinfo.html',
})
export class GroupinfoPage {
  groupId;
  groupName;
  groupmembers = [];
  group;
  owner:Boolean;
  constructor(public navCtrl: NavController, public events:Events, public navParams: NavParams, public groupservice:GroupService) {
    this.group = this.navParams.get('group');
    this.groupId = this.group.groupid;
    this.groupName = this.group.groupName;
  }

  ionViewDidLoad() {
    this.groupservice.getownership(this.groupId).then((res) => {
      if (res)
       {
        this.owner = true;
        console.log(this.groupmembers,"if")
        this.groupmembers = this.groupservice.currentgroup;      
       }
        else{
          this.groupservice.getgroupmembers();
        }
    }).catch((err) => {
      alert(err);
    })

    this.events.subscribe('gotmembers', () => {
      this.groupmembers = [];
      this.groupmembers = this.groupservice.currentgroup;
      console.log(this.groupmembers,"else")
    })

  }


}
