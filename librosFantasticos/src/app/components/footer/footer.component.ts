import { Component, OnInit } from '@angular/core';
import { AccesibilidadService } from '../Services/accesibilidad.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private access: AccesibilidadService) { }

  ngOnInit(): void {
  }
  speech(msg: string)
  {
    this.access.getSpeech(msg);
  }

}
