import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { AccesibilidadService } from '../Services/accesibilidad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logo='../../../assets/img/logo.png';
  b:string;
  constructor(private router: Router, public auth: AuthService, private access: AccesibilidadService) { }
  busqueda(b:string){
    this.b=b;
    (<HTMLInputElement>document.getElementById("buscar")).value="";
    this.router.navigate(['/Buscar',this.b]);

  }
  ngOnInit(): void {
  }

  changeAccess()
  {
    this.access.changeAccess();
  }

  getAccess()
  {
    return this.access.activeAccess;
  }

  speech(msg: string)
  {
    this.access.getSpeech(msg);
  }

}
