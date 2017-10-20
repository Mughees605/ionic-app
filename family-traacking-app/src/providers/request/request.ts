import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { UsersProvider } from '../users/users';
@Injectable()
export class RequestProvider {
  firereq = firebase.database().ref('/requests');
  userDetails = [];
  constructor(public http: Http, public usersProvider: UsersProvider, public events: Events) {
    console.log('Hello RequestProvider Provider');
  }

  sendrequest(req) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender,
        groupname:req.groupName
      }).then(() => {
        resolve({ success: true });
      }, (err) => {
        resolve({ err: err })
      })
    })
    return promise;
  }

  getmyrequests() {
    let allmyrequests;
    var myrequests = [];
    let uid = localStorage.getItem('uid');
    this.firereq.child(uid).on('value', (snapshot) => {
      allmyrequests = snapshot.val();
      console.log(allmyrequests)
      myrequests = [];
      for (var i in allmyrequests) {
         let obj = {ownerId:allmyrequests[i].sender, groupname:allmyrequests[i].groupname}
        myrequests.push(obj);
      }
    myrequests.map((val,i)=>{
     firebase.database().ref('/groups').child(val.ownerId).child(val.groupname).once('value',(snapshot)=>{
       console.log(snapshot.val(),"dddddddddddddddddddddddddd")
     })
    
    })
      // this.usersProvider.getallusers().then((res) => {
      //   var allusers = res;
      //   this.userDetails = [];
      //   for (var j in myrequests)
      //     for (var key in allusers) {
      //       if (myrequests[j] === allusers[key].uid) {
      //         console.log(allusers[key])
      //         this.userDetails.push(allusers[key]);
      //       }
      //     }
      //   this.events.publish('gotrequests');
      // })

    })
  }





}
