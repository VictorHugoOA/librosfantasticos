import { Component, OnInit,Input } from '@angular/core';
import { LibrosService } from '../services/libros.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
  randoms:string[];
  qrdata:string= "Hola soy un QR";
  index:number;

  @Input() value:string;
  constructor(private info:LibrosService) {
  
    
   }
   /*Indexrandom() {
    this.index=Math.floor(Math.random() * 10) + 0;  
    console.log(this.index);
    this.qrdata= this.randoms[this.index];
    console.log(this.qrdata);
  }*/
  ngOnInit(): void {
    console.log(this.value);
    this.qrdata=this.value;

  }


}
