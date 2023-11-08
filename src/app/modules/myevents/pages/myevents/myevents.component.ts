import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupModalComponent } from 'src/app/shared/components/popup-modal/popup-modal.component';
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';
import { ApiResp, Event } from 'src/app/data/interfaces/interfaces.interface';
import { finalize } from 'rxjs';



@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.scss']
})
export class MyeventsComponent implements OnInit {

  @ViewChild('popupModal') private modalComponent!: PopupModalComponent;

  modalStyle: string = 'modal-style-primary';
  modalTitle: string = 'Event Added Successfully';
  modalBody: string = 'The event has been created successfully';
  modalButtonColor: string = 'btn-primary';

  eventsByUser: Event[] = [];
  deleteEventId: number = 0;
  isWarningModal: boolean = false;
  delApiResp!: ApiResp;

  constructor(
    private eventService: EventDbApiService,
  ) { }

  ngOnInit(): void {
    this.getUserEvents();
  }

  getUserEvents() {
    this.eventService.getEventsByUser()
      .subscribe((res) => {this.eventsByUser = res.data, console.log(res.data)})
  }

  onDeleteEvent(eventId: number) {
    this.deleteEventId = eventId;
    this.setDeleteWarningModal();
  }

  setDeleteWarningModal() {
    this.isWarningModal = true;
    this.modalStyle = 'modal-style-danger';
    this.modalTitle = 'Delete Event '
    this.modalBody = `Deleting your event is permanent. Your event and all it's details will be permanently deleted.`;
    this.modalButtonColor = 'btn-danger';
    this.openModal();
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  open() {
    this.openModal();
  }

  getPopupValue(value: any) {
    if (value == 'Save click' && this.isWarningModal === true) {
      this.eventService.deleteEvent(this.deleteEventId)
        .pipe(
          finalize(() => {
            this.isWarningModal = false;
            this.setModalValues(this.delApiResp)
          }))
        .subscribe((res) => this.delApiResp = res)
    } else if (value === 'Save click') {
      this.getUserEvents()
    }
  }

  setModalValues(resp: ApiResp) {
    this.isWarningModal = false;
    this.modalStyle = (resp.status ? 'modal-style-success' : 'modal-style-danger');
    this.modalTitle += (resp.status ? 'Successfully' : 'Unsuccessfully');
    this.modalBody = resp.message;
    this.modalButtonColor = (resp.status ? 'btn-success' : 'btn-danger');
    this.openModal();
  }

}


