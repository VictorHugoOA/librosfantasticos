import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LibrosService,libro } from '../services/libros.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  //Variable de formulario
  Altas: FormGroup;
  //Libros en inventario
  Libros: libro[];

  constructor(private inventario:LibrosService) {
    // inicialización del formulario
    this.Altas = new FormGroup({
      nombre: new FormControl(),
      autor: new FormControl(),
      img: new FormControl(),
      sinopsis: new FormControl(),
    });
  }

  ngOnInit(): void {}

  guardarDatos(): void {}
}
