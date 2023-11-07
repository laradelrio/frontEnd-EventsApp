import { Component, OnInit } from '@angular/core';
import {Chart, registerables } from 'node_modules/chart.js'
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';
Chart.register(...registerables);

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit{

  chartData: [] = [];
  labelData: string[] = [];
  numData: number[] = [];
  colorData: string[] = [];

  constructor(
    private eventService: EventDbApiService,
  ){}

  ngOnInit(): void {
    this.RenderChart()
  }

  RenderChart(){
    const myChrart = new Chart('barChart', {  //we provide our id
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [ 
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 195, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          //border color color:[ 'rgba(000, 000, 000]' , 'rgba[000, 000, 000]']
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    }
  
  
  
  

}
