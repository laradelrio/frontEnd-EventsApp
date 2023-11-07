import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResp, Event } from 'src/app/data/interfaces/interfaces.interface';
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';

@Component({
  selector: 'app-shared-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input('event') event!: Event;
  @Output() deleteEvent = new EventEmitter<number>();
  readMore: boolean = false;
  imageUrl: string = '';
  modalStyle: string = '';
  modalTitle: string = '';
  modalBody: string = 'Event Added ';
  modalButtonColor: string = '';
  formTitle: string = 'Add New Event';

  constructor(
    private router: Router,
    
    private eventService: EventDbApiService,
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

  onDeleteEvent(){
    this.deleteEvent.emit(this.event.id_event);
  }


}
