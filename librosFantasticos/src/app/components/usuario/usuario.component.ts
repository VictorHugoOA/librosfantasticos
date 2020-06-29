import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from '../Services/usuarios/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @Input() userData: any;
  prestamos: any[] = null;

//prestamos: prestamo[];
  constructor(private users: UsuariosService) { }

  ngOnInit(): void {
    this.users.getUserPrestamos(this.userData.uid).snapshotChanges().subscribe((el) =>
    {
      this.prestamos = [];
      el.forEach((obj) =>
      {
        this.prestamos.push({fecha: obj.payload.doc.data()['fecha'], libro: obj.payload.doc.data()['libro'], prestamo: obj.payload.doc.data()['prestamo']});
      })
      console.log(this.prestamos);
    })
  }

}
