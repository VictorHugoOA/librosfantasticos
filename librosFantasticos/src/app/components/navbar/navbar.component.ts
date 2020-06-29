import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logo='../../../assets/img/logo.png';
  b:string;
  constructor(private router: Router) { }
  busqueda(b:string){
    this.b=b;
    (<HTMLInputElement>document.getElementById("buscar")).value="";
    this.router.navigate(['/Buscar',this.b]);

  }
  ngOnInit(): void {
  }

}
