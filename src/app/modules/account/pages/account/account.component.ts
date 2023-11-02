import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResp, Form, Modal } from 'src/app/data/interfaces/interfaces.interface';
import { UserApiDbService } from 'src/app/data/services/api/user-db-api.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FormService } from 'src/app/shared/services/form.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{

  isEditable: boolean = false;
  successfulSubmit: boolean = false;
  isPasswordUpdate: boolean = false;
  response: ApiResp = {
    status: false,
    message: ''
  }

  accountFormShape: Form[] = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'email' },
  ]

  accountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userApiDbService: UserApiDbService,
    private formService: FormService,
    private openModalService: NgbModal,
    private router: Router,
  ){
    this.accountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    })

  }

  ngOnInit(): void {
    this.accountForm.disable();
    this.getUserAccountDetails();
  }

  openModal(): void {
    this.openModalService.open(ModalComponent, { centered: true });
  }

  //MY ACCOUNT
  getUserAccountDetails() {
    this.userApiDbService.getUser()
      .subscribe((resp) => {
        this.accountForm.controls['email'].setValue(resp.data.email);
        this.accountForm.controls['username'].setValue(resp.data.username);
      })
  }

  onEdit(): void {
    this.isEditable = true;
    this.accountForm.enable()
  }
  
  onCancel(): void {
    this.isEditable = false;
    this.accountForm.disable();
    this.userApiDbService.getUser();
    this.getUserAccountDetails();
  }

  isValidInput(input: string): boolean | null {
    return this.accountForm.controls[input].errors && this.accountForm.controls[input].touched;
  }
  
  getInputError(field: string): string {
    return this.formService.getInputError(field, this.accountForm);
  }
  
  onSubmit(): void {
    if(this.accountForm.valid){
      this.userApiDbService.updateUser(this.accountForm)
      .pipe(
        finalize(()=>{
          if(this.successfulSubmit){
            this.updateAccDoneMessage('Successful', 'been updated successfully')
          }else{
            this.updateAccDoneMessage('Unsuccessful', 'NOT been updated successfully')
          }
          this.isEditable = false;
          this.getUserAccountDetails();
          this.accountForm.disable();
        }
      ))
      .subscribe((res)=> this.successfulSubmit = res.status);
      
    }else{
      this.accountForm.markAllAsTouched();
    }
  }

  updateAccDoneMessage(titleStatus: string, msgStatus: string){
    let modal: Modal = { 
      name: 'accountUpdated',
      title: `Account Updated ${titleStatus}`,
      msg: `Your account has ${msgStatus}`,
      confirmBtnName: 'OK',
    }
    this.userApiDbService.setModal(modal);
    this.openModal();
  }


  //PASSWORD UPDATE

  onCancelUpdatePwrd(){
    this.isPasswordUpdate = false;
  }

  showPasswordForm(){
    this.isPasswordUpdate = true;
  }

  updatePwrdDoneMessage( ){
    let modal: Modal = { 
      name: 'passwordUpdated',
      title: 'Password Updated Successfully',
      msg: 'Your password has been updated Successfully',
      confirmBtnName: 'OK',
    }
    this.userApiDbService.setModal(modal);
    this.openModal();
  }

 //DELETE MODAL

  onDeleteModal(){
    let modal: Modal = { 
      name: 'deleteUser',
      title: 'Delete Account',
      msg: 'Deleting your account is permanent.',
      confirmBtnName: 'Delete',
    }
    this.userApiDbService.setModal(modal);
    this.openModal();
  }

  delete(){
    this.userApiDbService.deleteUser().subscribe();
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }



}


