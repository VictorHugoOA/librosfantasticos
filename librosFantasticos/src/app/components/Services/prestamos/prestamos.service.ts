import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private db: AngularFirestore, private httpClient: HttpClient) { }

  consulta(url:string)
  {
      return this.httpClient.get(url);
    }
  }


