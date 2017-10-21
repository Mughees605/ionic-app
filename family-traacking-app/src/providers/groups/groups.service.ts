import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Events } from 'ionic-angular';
import { UsersProvider } from '../users/users';

@Injectable()

export class GroupService {
  firegroup = firebase.database().ref('/groups');
  myGroups: Array<any> = [];
  currentgroup: Array<any> = [];
  currentgroupname;
  currentgroupid:string;

  constructor(public events: Events, public userSer: UsersProvider) {

  }


  addgroup(newGroup) {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(newGroup.groupId).set({
        groupimage: newGroup.groupPic,
        groupname: newGroup.groupName,
        owner: firebase.auth().currentUser.uid
      }).then(() => {
        firebase.database().ref('/allGroups').child(newGroup.groupId).set({
          groupimage: newGroup.groupPic,
          groupname: newGroup.groupName,
          owner: firebase.auth().currentUser.uid
        }).then(() => {
          resolve(true)
        }).catch((err) => {
          reject(err);
        })
      })
    });
    return promise;
  }

  joinGroup(gid) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('allGroups').child(gid).on('value', (snapshot) => {
        let data = snapshot.val();
        console.log(data);
        this.userSer.getuserdetails().then((res: any) => {
          let user = res.uid;
          if (data.owner === user) {
            alert("you are owner of this group")
          }
          else {
           this.firegroup.child(data.owner).child(gid).child('members').push(res).then(()=>{
            this.firegroup.child(user).child(gid).set({
              groupimage:data.groupimage,
              owner: data.owner,
              groupname:data.groupname,
              msgboard: ''
            })
           })
          }
        }).catch((err)=>{
          reject(err);
        })
      })
    })
  }

  getmygroups() {
    let uid = localStorage.getItem('uid')
    this.firegroup.child(uid).once('value', (snapshot) => {
      this.myGroups = [];
      if (snapshot.val() != null) {
        var temp = snapshot.val();
        console.log(temp,"temp")
        for (var key in temp) {
          var newgroup = {
            groupName: temp[key].groupname,
            groupimage: temp[key].groupimage,
            owner: temp[key].owner,
            groupid: key
          }
          this.myGroups.push(newgroup);
        }
      }
      this.events.publish('newgroup');
    })

  }

  getownership(groupname) {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) => {
        var temp = snapshot.val().owner;
        if (temp == firebase.auth().currentUser.uid) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getintogroup(groupId) {
    console.log(groupId)
    if (groupId != null) {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupId).once('value', (snapshot) => {
        if (snapshot.val() != null) {
          console.log(snapshot.val())
          var temp = snapshot.val().members;
          console.log(temp,"fsddddddddddd")
          var groupname = snapshot.val().groupname;
          var owner = snapshot.val().owner
          this.currentgroup = [];
          for (var key in temp) {
            this.currentgroup.push(temp[key]);
          }
          this.currentgroupid = groupId;
          this.currentgroupname = groupname;
          this.events.publish('gotintogroup');
        }
      })
    }
  }

  acceptrequest(newmember) {
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('members').push(newmember).then(() => {
      this.firegroup.child(newmember.uid).child(this.currentgroupname).set({
        groupimage: "",
        owner: firebase.auth().currentUser.uid,
        msgboard: ''
      }).catch((err) => {
        console.log(err);
      })
      this.getintogroup(this.currentgroupname);
    })
  }

  getgroupmembers() {
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupid).once('value', (snapshot) => {
      var tempdata = snapshot.val().owner;
      this.firegroup.child(tempdata).child(this.currentgroupid).child('members').once('value', (snapshot) => {
        var tempvar = snapshot.val();
        for (var key in tempvar) {
          this.currentgroup.push(tempvar[key]);
        }
      })
    })
    this.events.publish('gotmembers');
  }

}