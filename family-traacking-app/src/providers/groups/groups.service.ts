import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Events } from 'ionic-angular';

@Injectable()

export class GroupService{
    firegroup = firebase.database().ref('/groups');
    myGroups: Array<any> = [];
    
    constructor(public events:Events){

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

      getmygroups() {
          let uid = localStorage.getItem('uid')
        this.firegroup.child(uid).once('value', (snapshot) => {
          this.myGroups = [];
          if(snapshot.val() != null) {
            var temp = snapshot.val();
            for (var key in temp) {
              var newgroup = {
                groupName: key,
                groupimage: temp[key].groupimage
              }
              this.myGroups.push(newgroup);
            }
          }
          this.events.publish('newgroup');
        })
        
      }
    
}