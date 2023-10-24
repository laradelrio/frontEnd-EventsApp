import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './pages/account/account.component';
import { ModalComponent } from './shared/modal/modal.component';
import { PasswordUpdateComponent } from './pages/account/password-update/password-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MapComponent,
    CalendarComponent,
    GraphicsComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    ModalComponent,
    PasswordUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    // ModalComponent,
    // NgbModule,
    AccountComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
