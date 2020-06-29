import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LibrosService, libro } from '../services/libros.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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

  urlImage: Observable<string>;
  strUrlImage: string;
  uploadPercent: Observable<number>;

  constructor(private inventario: LibrosService, private store: AngularFireStorage, private toastr: ToastrService) {
    // inicialización del formulario
    this.Altas = new FormGroup({
      nombre: new FormControl('', Validators.required),
      autor: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      sinopsis: new FormControl('', Validators.required),
      fisico: new FormControl('', Validators.required),
      electronico: new FormControl()
    });
  }

  ngOnInit(): void {
    this.inventario.getLibros().snapshotChanges().subscribe((data) => {
      this.Libros = [];
      data.forEach(element => {
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

  borrarLibro(id: string) {
    this.inventario.borrarLibro(id);
  }

  setSelected(libros: libro) {
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

  resetForm() {
    this.Altas.reset()
    this.inventario.edit = false;
    this.selectedLibro = null;
    this.strUrlImage = null;
    this.urlImage = null;
    this.uploadPercent = null;
  }

  getAltaLibro() {
    var newLibro = new libro();
    newLibro.nombre = this.Altas.get('nombre').value;
    newLibro.autor = this.Altas.get('autor').value;
    newLibro.img = this.strUrlImage;
    newLibro.sinopsis = this.Altas.get('sinopsis').value;
    newLibro.fisico = this.Altas.get('fisico').value;
    newLibro.electronico = this.Altas.get('electronico').value;

    return newLibro;
  }

  guardarDatos(): void {
    if (this.Altas.valid) {
      if (this.inventario.edit) {
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
    this.toastr.error("Lo siento, todos los campos deben estar llenos", "Todos los campos deben estar llenos");
  }

  onUpload(event) {
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `assets/portadas/profile_${id}`;
    const ref = this.store.ref(filePath);
    const task = this.store.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => { this.urlImage = ref.getDownloadURL();
      this.urlImage.subscribe((el)=> this.strUrlImage = el)
      })).subscribe();
  }

}