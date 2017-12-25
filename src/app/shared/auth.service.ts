import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>;
  private currentUser: firebase.User = null;

  constructor(public afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  getAuthState() {
    return this.authState;
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    if (this.currentUser == null) {
      return false;
    }
    return true;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logout(){
    this.afAuth.auth.signOut();
  }

}
