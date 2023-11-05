import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/data/interfaces/interfaces.interface';
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  events: Event[] = []

  constructor(
    private eventService: EventDbApiService,) {

  }
  ngOnInit(): void {
    this.getUserEvents()
  }

  getUserEvents() {
    this.eventService.getAllEvents()
      .subscribe((res) => {
        res.data.forEach((event) => this.events.push(event))
      })
  }
}