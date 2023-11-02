import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './pages/map/map.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    SharedModule,
  ]
})
export class MapModule { }
