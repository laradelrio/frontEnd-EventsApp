import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/data/interfaces/interfaces.interface';
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit{
  
  event!: Event;

  constructor(
    private eventService: EventDbApiService,
  ){}

  ngOnInit(): void {
    this.event = this.eventService.event
  }
  
 



}
