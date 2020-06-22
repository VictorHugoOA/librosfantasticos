import { Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  constructor() { }
  @ViewChild(MatAccordion) accordion: MatAccordion;
  ngOnInit(): void {
  }

}
