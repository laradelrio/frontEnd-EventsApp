import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyeventsRoutingModule } from './myevents-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyeventsComponent } from './pages/myevents/myevents.component';
import { AddComponent } from './pages/add/add.component';
import { UpdateComponent } from './pages/update/update.component';



@NgModule({
  declarations: [
    MyeventsComponent,
    AddComponent,
    UpdateComponent,
  ],
  imports: [
    CommonModule,
    MyeventsRoutingModule,
    SharedModule,
  ]
})
export class MyeventsModule { 

}
