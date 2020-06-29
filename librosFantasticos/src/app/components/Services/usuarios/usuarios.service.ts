import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private db: AngularFirestore) { }

  getUserAccount(uid: string)
  {
    return this.db.collection('usuarios').doc(uid);
  }
}
