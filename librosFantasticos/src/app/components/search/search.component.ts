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
  Libros:libro;
  constructor(private router: ActivatedRoute, private mislibros: LibrosService) {

    this.router.params.subscribe((params) => {
      this.b= params['b'];
      this.BusquedaLibros(params['b']);

      this.encontrada = false;
    });
   }
   BusquedaLibros(b: string){

   }

  ngOnInit(): void {
  }

}
