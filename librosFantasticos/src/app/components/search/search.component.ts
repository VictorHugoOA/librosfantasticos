import { Component, OnInit } from '@angular/core';
import { libro, LibrosService } from '../services/libros.service';
import { ActivatedRoute } from '@angular/router';
import { AccesibilidadService } from '../Services/accesibilidad.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  b:string;
  encontrada: boolean;
  Libros:libro[]=[];
  loading: boolean;
  constructor(private router: ActivatedRoute, private mislibros: LibrosService, private access: AccesibilidadService) {
    this.loading = true;
    this.router.params.subscribe((params) => {
      this.b= params['b'];
      this.BusquedaLibros(params['b']);

      this.encontrada = true;
    });
   }
    BusquedaLibros(b: string){
     this.mislibros.getLibroNombre(b).subscribe((data:any[])=>
    {
      data.forEach(element =>
        {
          console.log(element);
          let x = new libro();
          x.$key = element.id;
          x.nombre = element.nombre;
          x.autor = element.autor;
          x.sinopsis = element.sinopsis;
          x.img = element.img;
          this.Libros.push(x);
        })
      if(this.Libros.length <= 0 || b == "")
      {
        this.speech("El libro " + b + " no se encuentra en la base");
        this.encontrada = false;
      }
      else
      {
        this.encontrada = true;
      }
      this.loading = false;
    })
   }

  ngOnInit(): void {
  }
  speech(msg: string) {
    this.access.getSpeech(msg);
  }


}
