import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GithubUsersProvider } from '../../providers/github-users/github-users';
import { User } from '../../model/user';
/**
 * Generated class for the UserDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  login:string;
  user:User;
  constructor(public navCtrl: NavController, public navParams: NavParams, githubUser:GithubUsersProvider) {
    this.login = navParams.get('login');
    githubUser.loadDetails(this.login).subscribe(user =>{
        this.user = user;
        console.log(user);
    },(err)=>{alert(err)})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }

}
