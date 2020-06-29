import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  allUsers: AngularFirestoreCollection<any>;
  userData: Observable<firebase.User>;
  constructor(private auth: AngularFireAuth, private toastr: ToastrService, private usuarios: AngularFirestore) {
    this.userData = auth.authState;
    this.allUsers = this.usuarios.collection('usuarios');
  }

  signUp(email: string, password: string, nick: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('Succesfully Signed Up: ', res);
      this.userData.subscribe((user)=>{
        console.log(user.email);
        this.allUsers.add({uid: user.uid, usuario: nick, email: email, cargos: 0});
      })
      this.toastr.success("Se han guardado los datos con exito", "Exito");
    }).catch(error => {
      console.log('Something is wrong: ', error.message);
      this.toastr.error(error.message, "Error creando el usuario");
    });
  }
  signIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('Succesfully signed in');
      this.toastr.success("El usuario si esta registrado", "Usuario registrado");
    }).catch(error => {
      console.log('Something went wrong: ', error.mesagge);
      this.toastr.error(error.message, "Error al ingresar con el usuario");
    });
  }

  signOut()
  {
    this.auth.signOut();
  }

}
