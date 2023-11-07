import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
  ) { }
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
  showEditDel(): boolean{
    if(this.router.url === '/myevents'){
      return true;
    }
    return false

  }



}
