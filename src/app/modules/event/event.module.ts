import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './pages/event/event.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EventComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
  ]
})
export class EventModule { }
