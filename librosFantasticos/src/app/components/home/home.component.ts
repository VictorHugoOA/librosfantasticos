import { Component, OnInit } from '@angular/core';
import { LibrosService, libro } from '../servicios/libros.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Libros:libro[];
  libroRand:libro[] = [];
  logo="../../../assets/img/logo.png";
  
  constructor(private mislibros:LibrosService) { }

  ngOnInit(): void {
    this.Libros=this.mislibros.getLibros();
    var i = 0;
    while(i < 4)
    {
      var x = Math.floor(Math.random()*(this.Libros.length-1));
      if(!this.libroRand.find(element =>
        {
          element.nombre === this.Libros[x].nombre;
        }))
        {
          this.libroRand.push(this.Libros[x]);
          i++;
        }
    }

    console.log(this.libroRand);
    
  }

}
