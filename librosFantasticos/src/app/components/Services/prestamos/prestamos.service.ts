import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private db: AngularFirestore, private http: HttpClient) { }

  getDiasPrestamo() {
    return this.http.get('https://us-central1-libros-fantsticos.cloudfunctions.net/widgets/get-days');
    //return this.db.collection('dias');
  }

  addPrestamoUser(uid: string, libro: any, tipo: string) {

    let newDate = new Date();
    let strDia = '';
    let strMes = '';

    if (newDate.getDay() < 10)
      strDia = '0' + newDate.getDate();
    else {
      strDia = '' + newDate.getDate();
    }

    if (newDate.getMonth() < 10)
      strMes = '0' + (newDate.getMonth()+1);
    else {
      strMes = '' + (newDate.getMonth()+1);
    }

    console.log(strDia + '' + strMes + '' + newDate.getFullYear());
    this.db.collection('dias').doc(strDia + '' + strMes + '' + newDate.getFullYear()).snapshotChanges().pipe(take(1)).subscribe(data =>
      {
        console.log(data.payload.exists);
        if(!data.payload.exists)
        {
          this.db.collection('dias').doc(strDia + '' + strMes + '' + newDate.getFullYear()).set({ano: newDate.getFullYear(), dia: newDate.getDate(), mes: newDate.getMonth()+1, prestamos: 1});
        }
        else
        {
          this.db.collection('dias').doc(strDia + '' + strMes + '' + newDate.getFullYear()).update({prestamos: data.payload.data()['prestamos']+1});
        }
        this.db.collection(uid).add({fecha: newDate, libro: libro.$key, prestamo: tipo, renovable: true});
        if(tipo == "fisico")
        {
          this.db.collection('libros').doc(libro.$key).update({nombre: libro.nombre, autor: libro.autor, sinopsis: libro.sinopsis, img: libro.img, electronico: libro.electronico, fisico: libro.fisico-1});
        }
        return;
      });
    /*this.db.collection(uid).add({fecha: newDate, libro: libro.$key, prestamo: tipo});
    if(tipo == "fisico")
    {
      this.db.collection('libros').doc(libro.$key).update({nombre: libro.nombre, autor: libro.autor, sinopsis: libro.sinopsis, img: libro.img, electronico: libro.electronico, fisico: libro.fisico-1});
    }*/
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
  renovable: boolean;
}