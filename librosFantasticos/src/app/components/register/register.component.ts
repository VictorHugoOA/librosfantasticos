import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccesibilidadService } from '../Services/accesibilidad.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  validRegister: boolean;

  createFormGroup() {
    return new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      confirmEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  constructor(private auth: AuthService, public toastr: ToastrService, public access: AccesibilidadService) {

    this.registerForm = this.createFormGroup();

  }

  ngOnInit(): void {
  }

  onResetForm() {
    this.registerForm.reset();
  }

  get usuario() { return this.registerForm.get('usuario'); }
  get email() { return this.registerForm.get('email'); }
  get confirmEmail() { return this.registerForm.get('confirmEmail'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  checkEmail()
  {
    if(this.email.invalid)
    {
      this.toastr.error("Ese es un email invalido", "Error: Correo electronico");
      this.validRegister = false;
      return;
    }
    this.validRegister = true;
  }

  checkConfirmationEmail()
  {
    if(this.confirmEmail.invalid)
    {
      this.toastr.error("Ese es un email de confirmacion invalido", "Error: Correo electronico");
      this.validRegister = false;
    }
    this.validRegister = true;
  }

  checkPassword()
  {
    var pass = JSON.stringify(this.password.value);
    if(pass.match(' '))
    {
      this.toastr.error("La contraseña no puede tener espacios", "Error: Contraseña");
      this.validRegister = false;
      return;
    }
    if(pass.length < 6)
    {
      this.toastr.error("La contraseña debe tener minimo 6 caracteress", "Error: Contraseña");
      this.validRegister = false;
      return;
    }
    this.validRegister = true;
  }

  checkConfirmationPassword()
  {
    var pass = JSON.stringify(this.confirmPassword.value);
    if(pass.match(' '))
    {
      this.toastr.error("La contraseña de confirmacion no puede tener espacios", "Error: Contraseña");
      this.validRegister = false;
      return;
    }
    if(pass.length < 6)
    {
      this.toastr.error("La contraseña de confirmacion debe tener minimo 6 caracteres", "Error: Contraseña");
      this.validRegister = false;
      return;
    }
    this.validRegister = true;
  }

  onSaveForm() {
    if (this.email.value != this.confirmEmail.value) {
      this.toastr.error("Lo siento, los correos no coinciden", "Correos electronicos no coinciden");
      return;
    }
    if(this.password.value != this.confirmPassword.value)
    {
      this.toastr.error("Lo siento, las contraseñas no coinciden", "Las contraseñas no coinciden");
      return;
    }

    if(this.validRegister)
      this.auth.signUp(this.email.value, this.password.value, this.usuario.value);
    else
      this.toastr.error("Lo siento, esa no es una cuenta de registro valida", "Error cuenta de registro");
  }

}
