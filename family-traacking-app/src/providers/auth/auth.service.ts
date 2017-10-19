import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
@Injectable()

export class Auth {
  username:string;
  user = new Subject<any>();
  userRef = firebase.database().ref('/users')
  constructor(public afAuth:AngularFireAuth) { }
  

  signUp(user: any):Promise<any>{
    return this.afAuth.auth.createUserWithEmailAndPassword(user.username,user.password).then(()=>{
            return this.userRef.child(this.afAuth.auth.currentUser.uid).set({
                uid: this.afAuth.auth.currentUser.uid,
                displayName: user.username,
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
            })
    })
  }

  login(user):Promise<any>  {
    return this.afAuth.auth.signInWithEmailAndPassword(user.user_id,user.password)
  }

  logout():Promise<any>{
    return this.afAuth.auth.signOut()
  }

}