import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logo='../../../assets/img/logo.png';
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
