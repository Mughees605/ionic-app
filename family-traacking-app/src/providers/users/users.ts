import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from "firebase";
import { LocationTracker } from '../location/location';

@Injectable()
export class UsersProvider {
  firedata = firebase.database().ref('/users');
  latitude;
  longitude;
  constructor(public http: Http, public locationTracker: LocationTracker) {
    console.log('Hello UsersProvider Provider');
  }

  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }


  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  updateUser(location) {
    let uid = localStorage.getItem("uid");
    this.firedata.child(uid).update({
      latitude: location.latitude,
      longitude: location.longitude
    })
  }
}
