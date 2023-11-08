import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResp, Form } from 'src/app/data/interfaces/interfaces.interface';
import { UserApiDbService } from 'src/app/data/services/api/user-db-api.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FormService } from 'src/app/shared/services/form.service';
import { PopupModalComponent } from 'src/app/shared/components/popup-modal/popup-modal.component';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('popupModal') private modalComponent!: PopupModalComponent;

  isDetailsEditable: boolean = false;
  successfulSubmit: boolean = false;
  isPasswordUpdate: boolean = false;
  deleteModalOpened: boolean = false;
  modalStyle: string = '';
  modalTitle: string = '';
  modalBody: string = '';
  modalButtonColor: string = '';

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
    private router: Router,
  ) {
    this.accountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    })

  }

  ngOnInit(): void {
    this.accountForm.disable();
    this.getUserAccountDetails();

    this.userApiDbService.getAccountFormApiResp()
      .subscribe((resp) => this.setModalValues(resp));
  }


  isValidInput(input: string): boolean | null {
    return this.accountForm.controls[input].errors && this.accountForm.controls[input].touched;
  }

  getInputError(field: string): string {
    return this.formService.getInputError(field, this.accountForm);
  }

  //MY ACCOUNT
  getUserAccountDetails() {
    this.userApiDbService.getUser()
      .subscribe((resp) => {
        this.accountForm.controls['email'].setValue(resp.data.email);
        this.accountForm.controls['username'].setValue(resp.data.username);
      })
  }

  onDetailsEdit(): void {
    this.modalBody = 'Account Details Updated '
    this.isDetailsEditable = true;
    this.accountForm.enable()
  }

  onDetailsCancel(): void {
    this.isDetailsEditable = false;
    this.accountForm.disable();
    this.userApiDbService.getUser();
    this.getUserAccountDetails();
  }

  onDetailsSubmit(): void {
    if (this.accountForm.valid) {
      this.userApiDbService.updateUser(this.accountForm)
        .pipe(
          finalize(() => {
            this.isDetailsEditable = false;
            this.getUserAccountDetails();
            this.accountForm.disable();
          }
          ))
        .subscribe((res) => this.setModalValues(res));

    } else {
      this.accountForm.markAllAsTouched();
    }
  }

  //PASSWORD UPDATE
  showPasswordForm() {
    this.modalTitle = 'Password Updated '
    this.isPasswordUpdate = true;
  }

  onCancelUpdatePwrd() {
    this.isPasswordUpdate = false;
  }

  //DELETE ACCOUNT
  onDelete() {
    this.modalStyle = 'modal-style-danger';
    this.modalTitle = 'Delete Account'
    this.modalBody = 'Deleting your account is permanent. Your account and all the events you created will be permanently deleted.';
    this.modalButtonColor = 'btn-danger';
    this.deleteModalOpened = true;
    this.openModal();
  }

  deleteAccount() {
    let respStatus: boolean;
    this.userApiDbService.deleteUser()
      .pipe(
        finalize(() => {
          if (respStatus) {
            localStorage.removeItem('token');
            this.router.navigate(['/home']);
          }
        })
      )
      .subscribe((res) => { respStatus = res.status });
  }

  getPopupValue(value: any) {
    if (value == 'Save click' && this.deleteModalOpened) {
      this.deleteModalOpened = false;
      this.deleteAccount();
    }
  }

  //MODAL

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

  open() {
    this.openModal();
  }
}


