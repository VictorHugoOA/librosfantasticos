import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private db: AngularFirestore) { }

  getDiasPrestamo()
  {
    return this.db.collection('dias');
  }

}
