import { Component } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'librosFantasticos';
  constructor(private router: Router)
  {
    this.router.events.subscribe((ev)=>
    {
      if(ev instanceof NavigationEnd)
      {
        (<any>window).ga('set', 'page', ev.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    })
  }
}
