import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor() { }

  ngOnInit(): void {
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes proporcionar un Email';
    }

    return this.email.hasError('email') ? 'Email invalido' : '';
  }

}
