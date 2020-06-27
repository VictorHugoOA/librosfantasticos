import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<firebase.User>;
  constructor(private auth: AngularFireAuth) {
    this.userData = auth.authState;
  }

  signUp(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('Succesfully Signed Up: ', res);
    }).catch(error => {
      console.log('Something is wrong: ', error.message);
    });
  }
  signIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('Succesfully signed in');
    }).catch(error => {
      console.log('Something went wrong: ', error.mesagge);
    });
  }

  signOut()
  {
    this.auth.signOut();
  }

}
