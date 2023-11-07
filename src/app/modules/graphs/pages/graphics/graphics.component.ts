import { Component, OnInit } from '@angular/core';
import {Chart, registerables } from 'node_modules/chart.js'
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';
import { finalize } from 'rxjs';
import { Count } from 'src/app/data/interfaces/interfaces.interface';
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

  constructor(
    private eventService: EventDbApiService,
  ){
    this.getCountByEvent()
  }

  ngOnInit(): void {
    
  }

  countByEvent!: Count[];

  getCountByEvent(){
    this.eventService.getCountByCategory()
    .pipe(
      finalize( () => {
        this.setLabels();
        this.setNumData();
        this.renderChart()
      })
    )
    .subscribe( (res) =>  this.countByEvent = res.data)
  }

  setLabels(){
    this.countByEvent.forEach( (count) => this.labelData.push(count.name_category))
  }

  setNumData(){
    this.countByEvent.forEach( (count) => this.numData.push(count.amount))
  }

  renderChart(){
    const myChart = new Chart('barChart', { 
      type: 'bar',
      data: {
        labels: this.labelData,
        datasets: [{
          label: '# of Events by Category',
          data: this.numData,
          backgroundColor: [ 
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 195, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(25, 59, 64, 0.2)',
            'rgba(25, 159, 64, 0.2)',,
          ],
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
