import { Component } from '@angular/core';

import { NgbCalendar, NgbDateStruct, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  model: NgbDateStruct = {
    year: 0,
    month: 0,
    day: 0
  };

  constructor(
    private calendar: NgbCalendar
  ){
    this.model = calendar.getToday();
  }

  getDate(): string{
    return `${this.model.year}-${this.model.month}-${this.model.day}`
  }
  
  isValidDate(): boolean{
    let date = this.getDate();
    let isValid = new Date(date).toString();
    console.log(typeof(isValid), isValid)
    if(isValid == "Invalid Date"){
      return false;
    }else{
      return this.isDateAfterToday();
      
    }
  }

  isDateAfterToday(): boolean{
    let date = this.getDate()
    let givenDate = new Date(date);
    let currentDate = new Date();
    
    if(givenDate > currentDate ){
      return  true;
    }else{
      return false;
    }
  }
}

