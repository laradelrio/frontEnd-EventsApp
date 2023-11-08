import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResp, Event } from 'src/app/data/interfaces/interfaces.interface';
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';
import { PopupModalComponent } from 'src/app/shared/components/popup-modal/popup-modal.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  @ViewChild('popupModal') private modalComponent!: PopupModalComponent;

  modalStyle: string = '';
  modalTitle: string = 'Event Updated ';
  modalBody: string = '';
  modalButtonColor: string = '';
  formTitle: string = 'Update Event';
  event!: Event;

  constructor(
    private router: Router,
    private eventService: EventDbApiService,
  ) { }

  onEventSubmit(eventInfo: [number, FormGroup]) {
    console.log('form', eventInfo[1].value)
    this.eventService.updateEvent(eventInfo[0], eventInfo[1])
      .subscribe(
        (resp: ApiResp) => { this.setModalValues(resp) }
      )
  }

  setModalValues(resp: ApiResp) {
    this.modalStyle = (resp.status ? 'modal-style-success' : 'modal-style-danger');
    this.modalTitle += (resp.status ? 'Successfully' : 'Unsuccessfully');
    this.modalBody = resp.message;
    this.modalButtonColor = (resp.status ? 'btn-success' : 'btn-danger');
    this.openModal();
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  getPopupValue(value: any) {
    this.router.navigate(['/myevents']);
  }

  open() {
    this.openModal();
  }

}
