import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService, libro } from '../services/libros.service';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth/auth.service';
import { AccesibilidadService } from '../Services/accesibilidad.service';
import { PrestamosService } from '../Services/prestamos/prestamos.service';

@Component({
  selector: 'app-libro-info',
  templateUrl: './libro-info.component.html',
  styleUrls: ['./libro-info.component.css']
})
export class LibroInfoComponent implements OnInit {
  tipoPrestamo = new FormControl('', Validators.required);
  milibro: libro;
  posicion: string;
  bandera: boolean;
  user: any = null;
  constructor(public activedroute: ActivatedRoute, private Libro: LibrosService, public auth: AuthService, private access: AccesibilidadService, private prestamos: PrestamosService) {
    //recuperar posicióm
    this.activedroute.params.subscribe(params => {
      this.posicion = params['key'];

    });
    this.bandera = false;
  }
  option() {
    console.log(this.tipoPrestamo.value);
    if (this.tipoPrestamo.invalid) {
      this.bandera = true;
      this.speech("Debe seleccionar una opcion de prestamo para añadirlo");
    } else {
      this.bandera = false;
      this.prestamos.addPrestamoUser(this.user.uid, this.milibro, this.tipoPrestamo.value);
    }
  }
  revisar(): boolean {
    if (this.milibro.fisico > 0 || this.milibro.electronico) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit(): void {
    this.Libro.getLibros().snapshotChanges().subscribe((data) => {

      data.forEach(element => {
        let x = new libro();
        x.$key = element.payload.doc.id;
        x.nombre = element.payload.doc.data().nombre;
        x.autor = element.payload.doc.data().autor;
        x.sinopsis = element.payload.doc.data().sinopsis;
        x.img = element.payload.doc.data().img;
        x.fisico = element.payload.doc.data().fisico;
        x.electronico = element.payload.doc.data().electronico;

        if (x.$key == this.posicion) {
          this.milibro = new libro();
          this.milibro = x;
          this.speech('Informacion de ' + this.milibro.nombre + '. Autor: ' + this.milibro.autor + '... ' + this.milibro.sinopsis);
        }

      })
    });

    this.auth.userData.subscribe(el =>{
      this.user = {uid: el.uid, email: el.email};
    })

  }
  speech(msg: string) {
    this.access.getSpeech(msg);
  }

}
