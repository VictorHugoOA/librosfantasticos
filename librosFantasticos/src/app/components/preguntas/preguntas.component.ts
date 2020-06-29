import { Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { AccesibilidadService } from '../Services/accesibilidad.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  constructor(private access: AccesibilidadService) { }
  @ViewChild(MatAccordion) accordion: MatAccordion;
  ngOnInit(): void {
  }

  speech(msg: string)
  {
    this.access.getSpeech(msg);
  }

}
