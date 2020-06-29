import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private db: AngularFirestore, private http: HttpClient) { }

  getDiasPrestamo()
  {
    return this.http.get('http://localhost:8080/get-days');
    //return this.db.collection('dias');
  }

}
