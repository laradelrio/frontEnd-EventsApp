import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountComponent } from 'src/app/pages/account/account.component';
import { ApiDbService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit{
  modalTitle: string = "";
  modalMessage: string = "";
  modalName: string = "";
  confirmBtnName: string = ''

  constructor(
    private modalC: NgbModal,
    public activeModal: NgbActiveModal,
    private apiDbService: ApiDbService,
    private accountComponent: AccountComponent,
  ){
    
  }

  ngOnInit(): void {
    this.getModalContent();
  }

  modal = this.modalC;
  
  getModalContent(){
   let modalContent = this.apiDbService.modalInfo;
   this.modalName = modalContent.name;
   this.modalTitle = modalContent.title;
   this.modalMessage = modalContent.msg;
   this.confirmBtnName = modalContent.confirmBtnName;    
  }

  confirm() {
    this.modal.dismissAll();
    if(this.modalName === "deleteUser"){
      this.accountComponent.delete();
      
    }
  }

  cancel(){
    this.modal.dismissAll();
  }



}

