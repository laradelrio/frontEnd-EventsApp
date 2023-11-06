import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';
import { finalize } from 'rxjs';

import { Router } from '@angular/router';
import { Event } from 'src/app/data/interfaces/interfaces.interface';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  eventsArray: {}[] = [];
  eventsPromise!: Promise<any>;

  constructor(
    private eventService: EventDbApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.updateEvents()
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    eventClick: ((arg) => this.handleEventClick(arg))
  }

  handleEventClick(arg: EventClickArg){
    let eventClicked : Event;
    this.eventService.getEventsById(arg.event.id)
    .pipe(
      finalize( () => {
        this.eventService.event = eventClicked;
        this.router.navigate(['/event'])
      })
    )
    .subscribe(
      (res) => eventClicked = res.data[0]
    )
  }

  getEvents(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.eventService.getAllEvents()
        .pipe(
          finalize(() => resolve(this.eventsArray))
        )
        .subscribe((res) => {
          res.data.forEach((event) => {
            let date = (event.date).toString().slice(0, 10);
            this.eventsArray.push(
              {
                id: `${event.id_event}`,
                start: `${date}T${event.time}`,
                title: `${event.name}`,
                editable: false,
              })
          }
          )
        })
    })
  }

  //adds the events to the calendar
  async updateEvents() {
    let events = await this.getEvents();
    this.calendarOptions!.events = { events, backgroundColor: '#690DC3', borderColor: '#690DC3' };
  }

}
