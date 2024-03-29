import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapViewComponent } from './components/map-view/map-view.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { RouterModule } from '@angular/router';
import { PopupModalComponent } from './components/popup-modal/popup-modal.component';
import { EventCardComponent } from './components/event-card/event-card.component';






@NgModule({
  declarations: [
    MapViewComponent,
    EventFormComponent,
    PopupModalComponent,
    EventCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
   
  ], exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MapViewComponent,
    EventFormComponent,
    PopupModalComponent,
    EventCardComponent
    
  ]
})
export class SharedModule { }
