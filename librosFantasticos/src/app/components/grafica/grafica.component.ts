import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PrestamosService } from '../Services/prestamos/prestamos.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  chart: any = null;
  private label: string[] = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  private dat: number[] = [12, 19, 3, 5, 2, 3];
  private meses: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  constructor(private prestamos: PrestamosService) { }

  ngOnInit(): void {

    this.chart = new Chart("my chart", {
      type: 'line',
      data: {
        labels: this.label,
        datasets: [
          {
            label: 'No. de votos',
            data: this.dat,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
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

  }
}
