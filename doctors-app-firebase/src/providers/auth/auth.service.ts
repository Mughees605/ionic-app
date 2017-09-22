import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
@Injectable()

export class Auth {
  username:string;
  user = new Subject<any>();
  constructor(public afAuth:AngularFireAuth) { }


  signUp(user: any):firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.username,user.password)
  }

  login(user):firebase.Promise<any>  {
    return this.afAuth.auth.signInWithEmailAndPassword(user.user_id,user.password)
  }

  logout():firebase.Promise<any>{
    return this.afAuth.auth.signOut()
  }

}
