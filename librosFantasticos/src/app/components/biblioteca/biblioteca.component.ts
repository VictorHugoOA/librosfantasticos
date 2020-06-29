import { Component, OnInit } from '@angular/core';
import { LibrosService,libro } from '../services/libros.service';
import { AccesibilidadService } from '../Services/accesibilidad.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {
  Libros:libro[];
  constructor(private mislibros:LibrosService, private access: AccesibilidadService) { }

  ngOnInit(): void {
    this.mislibros.getLibros().snapshotChanges().subscribe((data)=>
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
          this.Libros.push(x);
        })
        console.log(this.Libros);
    });
  }

  speech(msg: string)
  {
    this.access.getSpeech(msg);
  }

}
