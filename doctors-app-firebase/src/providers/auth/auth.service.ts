import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';

const headers = new Headers({ "Content-Type": "application/json" });
@Injectable()

export class Auth {
  username:string;
  user = new Subject<any>();
  constructor(private http: Http) { }

  apiUrl: 'https://serene-refuge-41977.herokuapp.com/api';

  signUp(user: any) {
    return this.http.post('https://serene-refuge-41977.herokuapp.com/api/register', user, { headers })
      .map((res) => {
        return res.json();
      })
  }

  login(user) {
    return this.http.post('https://serene-refuge-41977.herokuapp.com/api/login', user, { headers })
      .map((res) => {
        let userLogin = res.json();
        let username = userLogin.data.user_id;
        localStorage.setItem("user",username)
        this.user.next(userLogin.data.user_id);
        return res.json();
      })
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
