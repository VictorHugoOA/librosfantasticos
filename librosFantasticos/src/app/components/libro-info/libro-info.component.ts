import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService, libro } from '../services/libros.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-libro-info',
  templateUrl: './libro-info.component.html',
  styleUrls: ['./libro-info.component.css']
})
export class LibroInfoComponent implements OnInit {
  Libros:libro[];
  milibro: libro;
  posicion:number;
  bandera:boolean;
  constructor( public activedroute: ActivatedRoute, private Libro:LibrosService) { 
    //recuperar posicióm
    this.activedroute.params.subscribe(params => {
      this.posicion=params['key'];
    });
    this.bandera=false;
  }
  option(){
    if($('#fisico').is(':checked') || $('#electronico').is(':checked')){

    }else{
    this.bandera=true;
    }
  }
  revisar():boolean{
    if(this.milibro.fisico > 0 || this.milibro.electronico){
      return true;
    }else{
     return false;
    }
  }
  ngOnInit(): void {
    this.Libro.getLibros().snapshotChanges().subscribe((data)=>
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
          x.fisico = element.payload.doc.data().fisico;
          x.electronico = element.payload.doc.data().electronico;
          this.Libros.push(x);
        })
        this.milibro=new libro();
        this.milibro=this.Libros[this.posicion];
    });
  }

}
