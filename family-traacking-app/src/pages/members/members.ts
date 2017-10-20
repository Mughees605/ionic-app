import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
})
export class MembersPage {
  temparr = [];
  filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UsersProvider) {
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




}
