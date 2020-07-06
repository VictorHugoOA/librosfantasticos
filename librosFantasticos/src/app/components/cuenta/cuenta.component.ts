import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { UsuariosService } from '../Services/usuarios/usuarios.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  constructor(public auth: AuthService, private users: UsuariosService) { }

  user: any = null;
  allowed: boolean = false;

  ngOnInit(): void {
    this.auth.userData.subscribe((el) =>
    {
      this.users.getUserAccount(el.uid).snapshotChanges().subscribe((elo) => {
        this.user = {uid: el.uid, usuario: elo.payload.data()['usuario'], cargos: elo.payload.data()['cargos'], email: elo.payload.data()['email']};
        console.log(this.user);
        this.allowed = true;
      })
    })
  }

}
