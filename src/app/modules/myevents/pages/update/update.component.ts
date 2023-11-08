import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/data/interfaces/interfaces.interface';
import { EventDbApiService } from 'src/app/data/services/api/event-db-api.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent{

  formTitle: string = 'Update Event';
  event!: Event;

  constructor(
  
  ){}



  
  

}
