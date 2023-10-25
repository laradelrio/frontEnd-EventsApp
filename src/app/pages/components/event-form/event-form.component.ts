import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, Form } from 'src/app/interfaces/interfaces.interface';
import { ApiDbService } from 'src/app/services/api-db.service';
import { DatePickerComponent } from 'src/app/shared/date-picker/date-picker/date-picker.component';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent {
//variable to store event Form value to be collected later
  eventData: Event ={
    name: '',
    userId: 0,
    category: '',
    description: '',
    date: '',
    time: '',
    location: '',
  };
  

  eventForm: FormGroup;
  
  
  constructor(
    private fb: FormBuilder,
    private apiDbService: ApiDbService,
    private datePicker: DatePickerComponent,
    
  ){
    this.eventForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      usersId: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required], Validators.minLength(10)],
      date: ['', Validators.required],
      time:['', Validators.required],
      location: ['', Validators.required],
    })
  }

  onSubmit(){
    //sort location
    if(this.eventForm.valid){
      this.eventData = this.eventForm.value;
    }else{
      //show event form error
    }
  }

  isValidInput(input: string): boolean | null{
    return this.eventForm.controls[input].errors && this.eventForm.controls[input].touched;
  }

  getInputError(field: string): string {
    return this.apiDbService.getInputError(field, this.eventForm);
  }  

  getDate(){
    if(this.datePicker.isValidDate()){
      this.datePicker.getDate();
      //return the date and that it's valid
    }else {
      //return that teh date is not valid // or like null?
    }
  }

  getTime(){

  }
  
}
