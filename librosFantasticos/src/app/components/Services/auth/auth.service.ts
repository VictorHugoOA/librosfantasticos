import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<firebase.User>;
  constructor(private auth: AngularFireAuth, private toastr: ToastrService) {
    this.userData = auth.authState;
  }

  signUp(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('Succesfully Signed Up: ', res);
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
