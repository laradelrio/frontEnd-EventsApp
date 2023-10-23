import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from 'src/app/interfaces/interfaces.interface';
import { ApiDbService } from 'src/app/services/api-db.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

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

  ){
    this.accountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    })

    this.accountForm.disable()

  }

  isValidInput(input: string): boolean | null{
    return this.accountForm.controls[input].errors && this.accountForm.controls[input].touched;
  }

  getInputError(field: string): string {
    return this.apiDbService.getInputError(field, this.accountForm);
  }

  onSubmit(): void{}



  onEdit():void{
    this.isEditable = true;
    this.accountForm.enable()
  }

  onCancel(): void{
    this.isEditable = false;
    this.accountForm.disable();
  }
  
}
