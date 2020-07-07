import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccesibilidadService } from '../Services/accesibilidad.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-registrocel',
  templateUrl: './registrocel.component.html',
  styleUrls: ['./registrocel.component.css']
})
export class RegistrocelComponent implements OnInit {

  registerForm: FormGroup;
  validRegister: boolean;
  windowRef: any;

  createFormGroup() {
    return new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      codigo: new FormControl('', [Validators.required])
    });
  }

  constructor(public toastr: ToastrService, public access: AccesibilidadService) {
    this.registerForm = this.createFormGroup();


  }

  getPhoneE164(number: string) {
    return `+52${number}`;
  }

  ngOnInit(): void {
    this.windowRef = window;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', { 'size': 'invisible' });
    this.windowRef.recaptchaVerifier.render();
  }

  onResetForm() {
    this.registerForm.reset();
  }

  get usuario() { return this.registerForm.get('usuario'); }
  get codigo() { return this.registerForm.get('codigo'); }

  sendCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.getPhoneE164(this.usuario.value);
    firebase.auth().signInWithPhoneNumber(num, appVerifier).then(result => {
      this.windowRef.confirmationResult = result;
      this.toastr.success("El codigo fue enviado con exito", "Numero de verificacion");
    }).catch(error => { console.log(error); this.toastr.error(error, "Error verificacion") });
  }

  verificarCodigo() {
    this.windowRef.confirmationResult.confirm(this.codigo.value).then(result => console.log(result)).catch(error => {console.log(error); this.toastr.error(error, "Error verificacion")});
  }

}
