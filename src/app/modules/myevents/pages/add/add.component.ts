import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResp } from 'src/app/data/interfaces/interfaces.interface';
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';
import { PopupModalComponent } from 'src/app/shared/components/popup-modal/popup-modal.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  @ViewChild('popupModal') private modalComponent!: PopupModalComponent;

  modalStyle: string = '';
  modalTitle: string = '';
  modalBody: string = 'Event Added ';
  modalButtonColor: string = '';
  formTitle: string = 'Add New Event';

  constructor(
    private eventService: EventDbApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.eventService.getEventFormApiResp()
      .subscribe((resp) => this.setModalValues(resp));

      this.eventService.eventFormSubmitAction = 'add';
      this.modalTitle = 'Event Added '
  }


  setModalValues(resp: ApiResp){
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
