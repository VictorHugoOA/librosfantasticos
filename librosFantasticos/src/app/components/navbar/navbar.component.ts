import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { AccesibilidadService } from '../Services/accesibilidad.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logo='../../../assets/img/logo.png';
  constructor(public auth: AuthService, private access: AccesibilidadService) { }

  ngOnInit(): void {
    this.auth.userData.subscribe((data)=>
    {
      console.log(data.uid);
    })
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
