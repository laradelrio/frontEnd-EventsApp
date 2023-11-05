import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/data/interfaces/interfaces.interface';

@Component({
  selector: 'app-shared-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input('event') event!: Event;
  readMore: boolean = false;
  imageUrl: string = '';

  constructor() { }
  ngOnInit(): void {
    // this.img()
  }

  date() {
    return (this.event.date).toString().slice(0, 10)
  }

  time() {
    return (this.event.time).toString().slice(0, 5)
  }

  showDescription() {
    this.readMore = true
  }

  hideDescription() {
    this.readMore = false;
  }

}
