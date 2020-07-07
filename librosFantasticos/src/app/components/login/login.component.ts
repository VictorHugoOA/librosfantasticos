import { Component, OnInit } from '@angular/core';
import { AccesibilidadService } from '../Services/accesibilidad.service';
import { FormGroup, FormControl, Validators, EmailValidator} from '@angular/forms';
import { AuthService } from '../Services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  loginForm: FormGroup;

  constructor(private access: AccesibilidadService, private auth: AuthService, private toastr: ToastrService) {
    this.loginForm = this.createFormGroup();
   }

  ngOnInit(): void {
    if(this.auth.userData)
    {
      console.log("Logged in");
    }
  }

  get email() { return this.loginForm.get('email');}
  get password() { return this.loginForm.get('password');}

  checkPassword()
  {
    var pass = JSON.stringify(this.password.value);
    if(pass.match(' '))
    {
      this.toastr.error("Lo siento, la contraseña tiene espacios", "Error: Contraseña invalida");
      return false
    }
    if(pass.length < 6)
    {
      this.toastr.error("La contraseña debe tener minimo 6 caracteres", "Error contaseña invalida");
      return false;
    }
    return true;
  }

  checkEmail()
  {
    if(this.email.invalid)
    {
      this.toastr.error("Lo siento, la cuenta de correo es invalida", "Error: Correo invalido");
      return false;
    }
    return true;
  }

  onResetForm()
  {
    this.loginForm.reset();
  }

  onSaveForm()
  {
    if(this.checkPassword() && this.checkEmail())
    {
      this.auth.signIn(this.email.value, this.password.value);
      
    }
    this.onResetForm();

  }

  speech(msg: string)
  {
    this.access.getSpeech(msg);
  }

  signOut()
  {
    this.auth.signOut();
  }

  getUserData()
  {
    return this.auth.userData;
  }

}
