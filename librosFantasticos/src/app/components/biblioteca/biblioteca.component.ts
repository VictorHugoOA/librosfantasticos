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
  loading:boolean;
  constructor(private mislibros:LibrosService, private access: AccesibilidadService) { 
    this.loading=true;
  }

  ngOnInit(): void {
    this.mislibros.getLibros().snapshotChanges().subscribe((data)=>
    {
      this.loading=false;
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

  buscar(termino: string)
  {
    this.mislibros.getLibroNombre(termino).subscribe((data:any[])=>
    {
      this.Libros = [];
      data.forEach(element =>
        {
          let x = new libro();
          x.$key = element.id;
          x.nombre = element.nombre;
          x.autor = element.autor;
          x.sinopsis = element.sinopsis;
          x.img = element.img;
          this.Libros.push(x);
        })
    })
  }

  speech(msg: string)
  {
    this.access.getSpeech(msg);
  }

}
