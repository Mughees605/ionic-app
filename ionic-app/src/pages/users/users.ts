import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user';
import { GithubUsersProvider } from '../../providers/github-users/github-users';
import { UserDetailsPage } from '../user-details/user-details';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  users: User[];
  originalUsers:User[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private githubUser: GithubUsersProvider) {
    githubUser.load().subscribe(users => {
      this.users = users;
      this.originalUsers = users;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, { login });
  }

  search(searchEvent) {
    let term = searchEvent.target.value;
    if (term.trim() === '' || term.trim().length < 3){
      this.users = this.originalUsers;
    }
    else{
      this.githubUser.searchUsers(term).subscribe(users=>{
        this.users = users;
      })
    }
  }

}
