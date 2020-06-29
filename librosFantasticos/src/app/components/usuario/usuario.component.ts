import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { Observable } from 'rxjs';
import { UsuariosService } from '../Services/usuarios/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  userData: any = null;

  constructor(private users: UsuariosService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.userData.subscribe((el:any) =>
    {
      this.users.getUserAccount(el.uid).snapshotChanges().subscribe(element => {
        this.userData = {email: element.payload.data()['email'], cargos: element.payload.data()['cargos'], usuario: element.payload.data()['usuario']};
      })
    })
  }

}
