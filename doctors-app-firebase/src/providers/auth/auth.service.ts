import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import firebase from 'firebase';
const headers = new Headers({ "Content-Type": "application/json" });
@Injectable()

export class Auth {
  username:string;
  user = new Subject<any>();
  constructor(private http: Http, public afAuth:AngularFireAuth) { }


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
