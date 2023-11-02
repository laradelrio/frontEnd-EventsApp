import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { AccountComponent } from './pages/account/account.component';
import { MyeventsComponent } from './pages/myevents/myevents.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'map', component: MapComponent,  canActivate: [authGuardGuard]},
  {path: 'calendar', component: CalendarComponent, canActivate: [authGuardGuard]},
  {path: 'graphics', component: GraphicsComponent, canActivate: [authGuardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'myaccount', component: AccountComponent},
  {path: 'myevents', component:MyeventsComponent},
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
