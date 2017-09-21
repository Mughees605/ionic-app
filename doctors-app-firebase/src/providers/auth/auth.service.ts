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

  apiUrl: 'https://serene-refuge-41977.herokuapp.com/api';

  signUp(user: any):firebase.Promise<any> { 
    return this.afAuth.auth.createUserWithEmailAndPassword(user.username,user.password)
  }

  login(user):firebase.Promise<any>  {
    console.log(user);
    return this.afAuth.auth.signInWithEmailAndPassword(user.user_id,user.password)
  }

  logout() {
    return this.http.get('https://serene-refuge-41977.herokuapp.com/api/logout')
      .map((res) => {
        localStorage.removeItem('user')
        return res
      })
      .catch((err) => Observable.throw(err));
  }

  dashboard() {
    return this.http.get('https://serene-refuge-41977.herokuapp.com/api/dashboard')
      .map((res) => {
        return res
      })
  }
}
