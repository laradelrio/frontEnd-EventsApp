import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutofillAddressComponent } from '../shared/autofill-address/autofill-address.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

 

  constructor(
    private addressForm: AutofillAddressComponent,
  ) { }

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

  isValidAddress(): boolean{
    return this.addressForm.address.valid;
  }

  getAddress(){
    console.log(this.addressForm.address.value)
  }


}
