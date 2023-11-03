import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'src/app/data/interfaces/interfaces.interface';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  modalInfo: Modal = {
    name: '',
    title: '',
    msg: '',
    confirmBtnName: '',
  };

  constructor(
    private openModalService: NgbModal,
  ) { }

  //Form Modal Functions
  modalTitleStatus(status: boolean){
    if(status){
      return 'Successful';
    } else{
      return 'Unsuccessful';
    }
  }
  
  modalMessage(modalInfo: string[]) {
    let modal: Modal = {
      name: modalInfo[0],
      title: modalInfo[1],
      msg: modalInfo[2],
      confirmBtnName: modalInfo[3],
    }
    this.setModal(modal);
    this.openModal();
  }

  setModal(modalInfo: Modal): void{
    this.modalInfo = modalInfo; 
  }  

  openModal(): void {
    this.openModalService.open(ModalComponent, { centered: true });
  }

  getInputError(input: string, form: FormGroup): string{
    let errors =  form.controls[input].errors  || {};
    let errorMessage: string = ""
    for(let error of Object.keys(errors)){
      switch(error){
        case 'required':
          errorMessage = "Required field";
          break;
        case 'email':
          errorMessage = 'Please enter a valid email';
          break;
        case 'minlength':
          errorMessage = 'Invalid input';
          break;
      }
    }
    return errorMessage;
  }

}