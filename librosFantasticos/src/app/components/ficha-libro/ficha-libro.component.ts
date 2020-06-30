import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccesibilidadService } from '../Services/accesibilidad.service';
import { libro } from '../services/libros.service';

@Component({
  selector: 'app-ficha-libro',
  templateUrl: './ficha-libro.component.html',
  styleUrls: ['./ficha-libro.component.css']
})
export class FichaLibroComponent implements OnInit {

  @Input() items:libro[]=[];

  mislibros:libro[]=[];
  constructor(private router:Router, private access: AccesibilidadService) { 

  }
  

  ngOnInit(): void {
    console.log(this.items);
    this.mislibros=this.items;
  }


  speech(msg: string)
  {
    this.access.getSpeech(msg);
  }

}
