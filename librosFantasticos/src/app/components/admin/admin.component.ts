import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LibrosService,libro } from '../services/libros.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';
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
  selectedLibro: string = null;

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

  borrarLibro(id: string)
  {
    this.inventario.borrarLibro(id);
  }

  setSelected(libros: libro)
  {
    this.inventario.edit = true;
    this.Altas.setValue({
      nombre: libros.nombre,
      autor: libros.autor,
      img: libros.img,
      sinopsis: libros.sinopsis,
      fisico: libros.fisico,
      electronico: libros.electronico
    })
    this.selectedLibro = libros.$key;

  }

  resetForm()
  {
    this.Altas.reset()
    this.inventario.edit = false;
    this.selectedLibro = null;
  }

  getAltaLibro()
  {
    var newLibro = new libro();
    newLibro.nombre = this.Altas.get('nombre').value;
    newLibro.autor = this.Altas.get('autor').value;
    newLibro.img = this.Altas.get('img').value;
    newLibro.sinopsis = this.Altas.get('sinopsis').value;
    newLibro.fisico = this.Altas.get('fisico').value;
    newLibro.electronico = this.Altas.get('electronico').value;

    return newLibro;
  }

  guardarDatos(): void {
    if(this.inventario.edit)
    {
      var newLibro = this.getAltaLibro();
      newLibro.$key = this.selectedLibro;
      this.inventario.updateLibro(newLibro);
      this.resetForm();
      return;
    }

    var newLibro = this.getAltaLibro();
    this.inventario.insertLibro(newLibro);
    this.resetForm();
    return;


  }
}
