import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from 'src/app/interfaces/interfaces.interface';
import { ApiDbService } from 'src/app/services/api-db.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{

  isEditable: boolean = false;
  accountFormShape: Form[] = [
    { name: 'username', label: 'Username' , type:'text' },
    { name: 'email', label: 'Email Address',type: 'email' },
    // { name: 'password', label: 'Password', type: 'password' },
    // { name: 'passwordConfirmed', label: 'Repeat Password', type: 'password' },
  ]

  accountForm: FormGroup

  constructor( 
    private fb: FormBuilder,
    private apiDbService: ApiDbService,
    private ngBmodal: NgbModal,
  ){
    this.accountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  openModal(): void {
    this.ngBmodal.open(ModalComponent, { centered: true });
  };

  ngOnInit(): void {
    this.accountForm.disable()
    this.getUserAccountDetails();

  }

  getUserAccountDetails(){
    this.apiDbService.getUser()
    .subscribe( (resp) => {
      this.accountForm.controls['email'].setValue(resp.data.email);
      this.accountForm.controls['username'].setValue(resp.data.username);
    })
  }

  isValidInput(input: string): boolean | null{
    return this.accountForm.controls[input].errors && this.accountForm.controls[input].touched;
  }

  getInputError(field: string): string {
    return this.apiDbService.getInputError(field, this.accountForm);
  }

  onSubmit(): void{
    this.apiDbService.updateUser(this.accountForm)
    .subscribe((resp) => console.log(resp.message))
    this.isEditable = false;
    this.getUserAccountDetails();

  }
  onEdit():void{
    this.isEditable = true;
    this.accountForm.enable()
  }

  onCancel(): void{
    this.isEditable = false;
    this.accountForm.disable();
    this.apiDbService.getUser();
    this.getUserAccountDetails();
    this.openModal();
  }
  
}


