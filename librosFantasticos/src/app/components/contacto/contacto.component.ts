import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AccesibilidadService } from '../Services/accesibilidad.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  user = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  comment = new FormControl('', [Validators.required, Validators.minLength(10)]);
  constructor(private access: AccesibilidadService, private httpClient: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes proporcionar un Email';
    }

    return this.email.hasError('email') ? 'Email invalido' : '';
  }

  getCommentError()
  {
    if(this.comment.hasError('required'))
    {
      return 'Debes proporcionar un comentario';
    }
    else if(this.comment.hasError('minLength'))
    {
      return 'El comentario debe tener minimo 10 caracteres';
    }
  }

  getUserError()
  {
    if(this.user.hasError('required'))
    {
      return 'Debes proporcionar un nombre';
    }
  }

  speech(msg: string)
  {
    this.access.getSpeech(msg);
  }
  sendMessage()
  {
    if(this.comment.invalid)
    {
      this.toastr.error("El comentario debe tener minimo 10 caracteres", 'Error en el comentario');
      return;
    }
    if(this.user.invalid)
    {
      this.toastr.error("Debes proporcionar un nombre", 'Error en el nombre');
      return;
    }

    console.log(this.email.value);
    console.log(this.comment.value);
    console.log(this.user.value);

    this.httpClient.post('http://localhost:8080/send-email', {from: this.email.value, msg: this.comment.value, user: this.user.value}).subscribe((data)=>
    {
      console.log(data);
    })
  }

}
