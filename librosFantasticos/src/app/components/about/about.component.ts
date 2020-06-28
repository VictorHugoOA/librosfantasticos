import { Component, OnInit } from '@angular/core';
import { AccesibilidadService } from '../Services/accesibilidad.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  portada="../../../assets/img/portada.png";
  constructor(private access: AccesibilidadService) { }

  ngOnInit(): void {
    this.speech("Libros fantasticos... Biblioteca virtual")
  }

  speech(msg: string)
  {
    this.access.getSpeech(msg);
  }

}
