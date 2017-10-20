import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class RequestProvider {
  firereq = firebase.database().ref('/requests');

  constructor(public http: Http) {
    console.log('Hello RequestProvider Provider');
  }

  sendrequest(req) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender
      }).then(() => {
        resolve({ success: true });
      },(err)=>{
        resolve({err:err})
      })
    })
    return promise;
  }




}
