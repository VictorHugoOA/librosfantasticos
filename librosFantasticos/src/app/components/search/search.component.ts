import { Component, OnInit } from '@angular/core';
import { libro, LibrosService } from '../services/libros.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  b:string;
  encontrada: boolean;
  Libros:libro[];
  constructor(private router: ActivatedRoute, private mislibros: LibrosService) {

    this.router.params.subscribe((params) => {
      this.b= params['b'];
      this.BusquedaLibros(params['b']);

      this.encontrada = false;
    });
   }
   async BusquedaLibros(b: string){
    await this.mislibros.getLibroNombre(b).subscribe((data:any[])=>
    {
      this.Libros = [];
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
      if(this.Libros.length <= 0)
      {
        this.encontrada = false;
      }
      else
      {
        this.encontrada = true;
      }
    })
   }

  ngOnInit(): void {
  }

}
