import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupModalComponent } from 'src/app/shared/components/popup-modal/popup-modal.component';
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';
import { FormService } from 'src/app/shared/services/form.service';
import { ApiResp } from 'src/app/data/interfaces/interfaces.interface';


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
  displayEventForm: boolean = false;

  constructor(
    private eventService: EventDbApiService,
  ) { }

  ngOnInit(): void {
    this.eventService.getEventFormApiResp()
      .subscribe((resp) => this.setModalValues(resp));
  }

  displayAddEventForm() {
    this.displayEventForm = true;
    this.eventService.eventFormSubmitAction = 'add';
    this.modalTitle = 'Event Added '
  }

  setModalValues(resp: ApiResp){
    this.modalStyle = (resp.status ? 'modal-style-success' : 'modal-style-danger');
    this.modalTitle += (resp.status ? 'Successfully' : 'Unsuccessfully');
    this.modalBody = resp.message;
    this.modalButtonColor = (resp.status ? 'btn-success' : 'btn-danger');
    this.displayEventForm = false;
    this.openModal();
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  getPopupValue(value: any) {
    if (value == 'Save click') {
      // console.log(value);
    } else {
      //cancel has been clicked
    }
  }

  open() {
    this.openModal();
  }
}


