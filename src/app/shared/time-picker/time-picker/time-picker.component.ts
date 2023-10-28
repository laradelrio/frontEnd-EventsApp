import { Component } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent {
  time = { hour: 13, minute: 30 };

  getTime(): string{
    return `${this.time.hour}:${this.time.minute}`;
  }

  isValidTime(): boolean{
    if( this.time.hour <= 23 && this.time.hour >= 0 && this.time.minute <= 59 && this.time.minute <= 0){
      return false;
    }else{
      return true;
    }
  }
}
