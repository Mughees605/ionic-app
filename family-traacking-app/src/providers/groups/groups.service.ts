import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
@Injectable()

export class GroupService{
    firegroup = firebase.database().ref('/groups');
    
    constructor(){

    }

    addgroup(newGroup) {
        var promise = new Promise((resolve, reject) => {
          this.firegroup.child(firebase.auth().currentUser.uid).child(newGroup.groupName).set({
            groupimage: newGroup.groupPic,
            msgboard: '',
            owner: firebase.auth().currentUser.uid
          }).then(() => {
            resolve(true);
            }).catch((err) => {
              reject(err);
          })
        });
        return promise;
      }
}