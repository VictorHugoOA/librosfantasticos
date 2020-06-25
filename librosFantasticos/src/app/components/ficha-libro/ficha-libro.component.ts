import { Component, OnInit } from '@angular/core';
import { LibrosService, libro } from '../services/libros.service';

@Component({
  selector: 'app-ficha-libro',
  templateUrl: './ficha-libro.component.html',
  styleUrls: ['./ficha-libro.component.css']
})
export class FichaLibroComponent implements OnInit {

  Libros:libro[];
  constructor(private mislibros:LibrosService) { }

  ngOnInit(): void {
    this.Libros=this.mislibros.getLibros();
  }
}
