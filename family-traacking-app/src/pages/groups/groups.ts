import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewgroupsPage } from '../newgroups/newgroups';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addGroup(){
    console.log("add group")
    this.navCtrl.push(NewgroupsPage);
  }

}
