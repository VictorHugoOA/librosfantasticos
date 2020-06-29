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

  constructor(private users: UsuariosService) { }

  ngOnInit(): void {
    this.users.getUserPrestamos(this.userData.uid).snapshotChanges().subscribe((el) =>
    {
      console.log(el);
    })
  }

}
