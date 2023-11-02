import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountComponent } from 'src/app/modules/account/pages/account/account.component';
import { UserApiDbService } from 'src/app/data/services/api/user-db-api.service';

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
    private userApiDbService: UserApiDbService,
    private accountComponent: AccountComponent,
  ){
    
  }

  ngOnInit(): void {
    this.getModalContent();
  }

  modal = this.modalC;
  
  getModalContent(){
  let modalContent = this.userApiDbService.modalInfo;
  this.modalName = modalContent.name;
  this.modalTitle = modalContent.title;
  this.modalMessage = modalContent.msg;
  this.confirmBtnName = modalContent.confirmBtnName;    
  }

  confirm() {
    this.modal.dismissAll();
    if(this.modalName === "deleteUser"){
      this.accountComponent.delete();
    }else if(this.modalName === "passwordUpdated"){
      this.cancel();
    }
  }

  cancel(){
    this.modal.dismissAll();
  }



}

