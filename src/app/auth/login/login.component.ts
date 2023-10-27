import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiResp, Form, JWT } from 'src/app/interfaces/interfaces.interface';
import { ApiDbService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent {

  loginErrorMsg: string ="";
  respStatus: boolean = false;
  response: JWT = {};

  signInForm: Form[] = [
    { name: 'email', label: 'Email Address',type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ]

  loginForm: FormGroup
  constructor( 
    private fb: FormBuilder,
    private apiDbService: ApiDbService,
    private router: Router
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  isValidInput(input: string): boolean | null{
    return this.loginForm.controls[input].errors && this.loginForm.controls[input].touched;
  }

  getInputError(field: string): string {
    return this.apiDbService.getInputError(field, this.loginForm);
  }

  onSubmit(){   
    if(this.loginForm.valid){
      this.apiDbService.loginUser(this.loginForm)
      .pipe(
        finalize(()=>{
          if(this.response.data !== undefined ){
            localStorage.setItem("token", this.response.data.token)
            this.router.navigate(['/home']);    
          }else{
            if(this.response.message !== undefined){
              this.loginErrorMsg = this.response.message;
            }
            
          }
        })       
      )
      .subscribe({
        next: (resp) => (this.response = resp ), 
        error: (error) => (console.error('error', error))
      });
    }else{
      this.loginForm.markAllAsTouched();
      this.signInForm.forEach((input)=>{
        this.apiDbService.getInputError(input.name, this.loginForm);
      })
    }
  }
}
