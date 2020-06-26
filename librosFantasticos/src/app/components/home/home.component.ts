import { Component, OnInit } from '@angular/core';
import { LibrosService, libro } from '../services/libros.service';


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
  this.mislibros.getLibros().snapshotChanges().subscribe((data)=>
    {
      this.Libros = [];
      data.forEach(element =>
        {
          let x = new libro();
          x.$key = element.payload.doc.id;
          x.nombre = element.payload.doc.data().nombre;
          x.autor = element.payload.doc.data().autor;
          x.sinopsis = element.payload.doc.data().sinopsis;
          x.img = element.payload.doc.data().img;
          this.Libros.push(x);
        })
        console.log(this.Libros);
        var i = 0;
        while(i < 5)
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
        
      
    });
  }

}
