import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { MainpageComponent } from './layout/mainpage/mainpage.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    NavbarComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,

  
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
