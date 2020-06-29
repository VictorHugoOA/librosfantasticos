import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PrestamosService } from '../Services/prestamos/prestamos.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {
  private chart: any = null;
  private label:string[]= [];
  private dat:number[]=[];
  constructor(public prestamos:PrestamosService) { 
    
    
  }

  ngOnInit(): void {
    let url = `http://localhost:8080/get-days`;

    this.prestamos.consulta(url).subscribe((data2: any[]) => {
    

      console.log(data2);
      data2.forEach((element) => {
       this.dat.push(element.prestamos);
        this.label.push(element.dia+"/0"+element.mes);        

      });
      this.chart = new Chart("my chart", {
        type: 'bar',
        data: {
          labels: this.label,
          datasets: [
            {
              label: 'No. de prestamos por día',
              data: this.dat,
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
              
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
             
              ],
              borderWidth: 1,
            },
          ],
        },
        options: { responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    });
    
  }

}
