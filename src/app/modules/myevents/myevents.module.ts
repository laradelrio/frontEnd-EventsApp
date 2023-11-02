import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyeventsRoutingModule } from './myevents-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyeventsComponent } from './pages/myevents/myevents.component';


@NgModule({
  declarations: [
    MyeventsComponent,
  ],
  imports: [
    CommonModule,
    MyeventsRoutingModule,
    SharedModule,
  ]
})
export class MyeventsModule { }