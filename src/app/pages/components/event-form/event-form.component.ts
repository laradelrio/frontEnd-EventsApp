import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Event } from 'src/app/interfaces/interfaces.interface';
import { FormService } from 'src/app/services/form.service';
import { LocationsService } from 'src/app/services/locations.service';
import { UserApiDbService } from 'src/app/services/user-db-api.service';
import { AutofillAddressComponent } from 'src/app/shared/autofill-address/autofill-address.component';
import { DatePickerComponent } from 'src/app/shared/date-picker/date-picker/date-picker.component';
import { TimePickerComponent } from 'src/app/shared/time-picker/time-picker/time-picker.component';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent {

  todayDate: string = new Date().toISOString().slice(0, -8)

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
    private formService: FormService,
    private userService: UserApiDbService,
    private datePicker: DatePickerComponent,
    private timePicker: TimePickerComponent,
    private locationService: LocationsService, 
    private addressComponent: AutofillAddressComponent, 
  ){
    this.eventForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      userId: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required, ],
      time:['', Validators.required],
      location: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
    })
  }

  isValidInput(input: string): boolean | null{
    return this.eventForm.controls[input].errors && this.eventForm.controls[input].touched;
  }

  getInputError(field: string): string {
    return this.formService.getInputError(field, this.eventForm);
  }  
  

  onSubmit(){
    this.eventForm.markAllAsTouched()
    this.addressComponent.address.markAllAsTouched()
    console.log(
    this.locationService.longitude,
    this.locationService.latitude,
    this.locationService.location,)

    

    //check if inputs valid?
  // if(this.isValidDateAndLocation() ){
  //   this.setEventFormValues();
  //   console.log('valid data and location')
  //   if(this.eventForm.valid){
      
  //     console.log(this.eventForm.value);
  //   }
  // }else{
  //   this.eventForm.markAllAsTouched();
  //     // this.autofillAddress.inputTouched();
  //     this.datePicker.inputTouched();
  // }

 
  }

  isValidDateAndLocation(){
    // this.formService.getAddress();
    
    // if(!this.datePicker.isValidDate() && !this.formService.isValidAddress()){
    //   return false;
    // }else{
    //   return true;
    // }
  }

  //collect values for other components and put then in the event form
  setEventFormValues(){
    this.eventForm.controls['user_id'].setValue(this.userService.getUserId())
    this.eventForm.controls['date'].setValue(this.datePicker.getDate());
    this.eventForm.controls['time'].setValue(this.timePicker.getTime());
    // this.eventForm.controls['location'].setValue(this.autofillAddress.getAddress());
    // let coordinates: number[] | undefined = this.autofillAddress.getCoordinates();
    // this.eventForm.controls['longitude'].setValue(coordinates[0]);
    // this.eventForm.controls['latitude'].setValue(coordinates[1]);
  }
}


