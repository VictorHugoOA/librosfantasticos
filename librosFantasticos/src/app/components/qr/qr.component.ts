import { Component, OnInit,Input } from '@angular/core';
import { LibrosService } from '../services/libros.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
  randoms:string[];
  qrdata:string= null;
  index:number;

  @Input() value:string;
  constructor(private info:LibrosService) {
  
    
   }

  ngOnInit(): void {
    console.log(this.value);

    this.info.getLibroQr(this.value).subscribe((data)=>{
      this.qrdata = data['msg'];
    });

  }


}
