import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  productList: AngularFirestoreCollection<any>;
  products$: Observable<libro[]>;

  //Agregamos modulo de firesotre para conectarnos a la base
    constructor(private firestore: AngularFirestore) { }
    getLibros(){
      this.productList = this.firestore.collection('libros');
      this.products$ = this.productList.valueChanges();
      return this.productList;
    }

    insertLibro(libros: libro)
    {
      this.productList.add({nombre:libros.nombre, autor: libros.autor, img: libros.img, sinopsis: libros.sinopsis});
    }
  }
  
  export class libro{
    $key: string;
    nombre:string;
    autor:string;
    img:string;
    sinopsis:string;
  }