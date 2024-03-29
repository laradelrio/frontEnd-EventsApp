import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from 'src/app/data/interfaces/interfaces.interface';
import { UserApiDbService } from 'src/app/data/services/api/user-db-api.service';
import { AccountComponent } from '../../account.component';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent {

  isSubmit: boolean = false;
  passwordUpdateForm: FormGroup;
  passwordFormShape: Form[] = [
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'passwordConfirmed', label: 'Repeat Password', type: 'password' },
  ]

  constructor(
    private fb: FormBuilder,
    private userApiDbService: UserApiDbService,
    private formService: FormService,
    private accountComponent: AccountComponent,
  ){
    this.passwordUpdateForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmed: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  isValidInput(input: string): boolean | null {
    return this.passwordUpdateForm.controls[input].errors && this.passwordUpdateForm.controls[input].touched;
  }

  getInputError(field: string): string {
    return this.formService.getInputError(field, this.passwordUpdateForm);
  }

  updatePassword(){
    if(this.passwordUpdateForm.valid && this.samePassword()){
      this.userApiDbService.updatePassword(this.passwordUpdateForm)
      .subscribe( (resp) => this.userApiDbService.accountFormApiResp.next(resp));
      
      this.accountComponent.onCancelUpdatePwrd();

      this.isSubmit = false;
    }else{
      this.passwordUpdateForm.markAllAsTouched();
      this.isSubmit = true;
    }   
  }

  samePassword(): boolean {
    return (this.passwordUpdateForm.get('password')?.value === this.passwordUpdateForm.get('passwordConfirmed')?.value)
  }
  
  
  

  
}
