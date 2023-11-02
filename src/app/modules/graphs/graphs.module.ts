import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphsRoutingModule } from './graphs-routing.module';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GraphicsComponent,
  ],
  imports: [
    CommonModule,
    GraphsRoutingModule,
    SharedModule,
  ],
})
export class GraphsModule { }
