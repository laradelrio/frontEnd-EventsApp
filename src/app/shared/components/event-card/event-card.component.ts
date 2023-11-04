import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {

  readMore: boolean = false;

  showDescription() {
    this.readMore = true
  }

  hideDescription() {
    this.readMore = false;
  }

}
