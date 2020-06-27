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
      fisico: new FormControl(),
      electronico: new FormControl()
    });
  }

  ngOnInit(): void {
    this.inventario.getLibros().snapshotChanges().subscribe((data)=>
    {
      this.Libros = [];
      data.forEach(element =>
        {
          let x = new libro();
          x.$key = element.payload.doc.id;
          x.nombre = element.payload.doc.data().nombre;
          x.autor = element.payload.doc.data().autor;
          x.sinopsis = element.payload.doc.data().sinopsis;
          x.img = element.payload.doc.data().img;
          x.fisico = element.payload.doc.data().fisico;
          x.electronico = element.payload.doc.data().electronico;
          this.Libros.push(x);
        })
        console.log(this.Libros);
    });
  }

  guardarDatos(): void {}
}
