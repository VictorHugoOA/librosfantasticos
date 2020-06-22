import { Component, OnInit } from '@angular/core';
import { LibrosService,libro } from '../servicios/libros.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {
  Libros:libro[];
  constructor(private mislibros:LibrosService) { }

  ngOnInit(): void {
    this.Libros=this.mislibros.getLibros();
  }
}
