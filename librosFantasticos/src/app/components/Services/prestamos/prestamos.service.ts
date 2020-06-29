import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private db: AngularFirestore, private http: HttpClient) { }

  getDiasPrestamo() {
    return this.http.get('http://localhost:8080/get-days');
    //return this.db.collection('dias');
  }

  addPrestamoUser(uid: string, libro: any, tipo: string) {
    let newDate = new Date();
    let strDia = '';
    let strMes = '';

    if (newDate.getDay() < 10)
      strDia = '0' + newDate.getDay();
    else {
      strDia = '' + newDate.getDay();
    }

    if (newDate.getMonth() < 10)
      strMes = '0' + newDate.getMonth();
    else {
      strMes = '' + newDate.getMonth();
    }

    console.log(strDia + '' + strMes + '' + newDate.getFullYear());
    this.db.collection(uid).add({fecha: newDate, libro: libro.$key, prestamo: tipo});
    if(tipo == "fisico")
    {
      this.db.collection('libros').doc(libro.$key).update({nombre: libro.nombre, autor: libro.autor, sinopsis: libro.sinopsis, img: libro.img, electronico: libro.electronico, fisico: libro.fisico-1});
    }
  }


}

export class prestamo{
  fechaInicio:Date;
  fechaEntrega:Date;
  $key: string;
  nombre: string;
  autor: string;
  img: string;
  modalidad: string;
  estado: boolean;
  libro: string;
}