import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  productList: AngularFirestoreCollection<any>;
  products$: Observable<libro[]>;

  edit: boolean;

  //Agregamos modulo de firesotre para conectarnos a la base
  constructor(private firestore: AngularFirestore, private httpClient: HttpClient) { }
  getLibros() {
    this.productList = this.firestore.collection('libros');
    this.products$ = this.productList.valueChanges();
    return this.productList;
  }

  getLibroQr(uid: string)
  {
    return this.httpClient.get(`http://localhost:3000/get-qr/${uid}`);
  }

  insertLibro(libros: libro) {
    this.productList.add({
      nombre: libros.nombre,
      autor: libros.autor,
      img: libros.img,
      sinopsis: libros.sinopsis,
      fisico: libros.fisico,
      electronico: libros.electronico
    });
  }

  updateLibro(libros: libro)
  {
    this.productList.doc(libros.$key).update({
      nombre: libros.nombre,
      autor: libros.autor,
      img: libros.img,
      sinopsis: libros.sinopsis,
      fisico: libros.fisico,
      electronico: libros.electronico
    })
  }

  borrarLibro(idLibro:string) {
    console.log(idLibro);
    this.productList.doc(idLibro).delete();
  }
}

export class libro {
  $key: string;
  nombre: string;
  autor: string;
  img: string;
  sinopsis: string;
  fisico: number;
  electronico: boolean;
}