import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Form, Register } from 'src/app/interfaces/interfaces.interface';
import { FormService } from 'src/app/services/form.service';
import { UserApiDbService } from 'src/app/services/user-db-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent {

  registerErrorMsg: string ="";
  respStatus: boolean = false;

  signUpForm: Form[] = [
    { name: 'username', label: 'Username' , type:'text' },
    { name: 'email', label: 'Email Address',type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'passwordConfirmed', label: 'Repeat Password', type: 'password' },
  ]

  registerForm: FormGroup
  constructor( 
    private fb: FormBuilder,
    private  userApiDbService: UserApiDbService,
    private fromService: FormService,
    private router: Router
  ){
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmed: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  isValidInput(input: string): boolean | null{
    return this.registerForm.controls[input].errors && this.registerForm.controls[input].touched;
  }

  getInputError(field: string): string {
    return this.fromService.getInputError(field, this.registerForm);
  }
  samePassword(): boolean {
    return (this.registerForm.get('password')?.value === this.registerForm.get('passwordConfirmed')?.value)
  }

  onSubmit(){
    if(this.registerForm.valid && this.samePassword()){
      this.userApiDbService.registerUser(this.registerForm)
      .pipe(
        finalize(()=>{
          if(this.respStatus){
            this.router.navigate(['/login'])
          }
        })       
      )
      .subscribe({
        next: (resp) => (this.registerErrorMsg = resp.message, this.respStatus = resp.status), 
        error: (error) => (console.error('error', error))
      });
    }else{
      if(!this.samePassword()){
        this.registerErrorMsg = "Passwords don't Match"; 
      } 

      this.registerForm.markAllAsTouched();
      this.signUpForm.forEach((input)=>{
        this.fromService.getInputError(input.name, this.registerForm);
      })
    }
  }
}
