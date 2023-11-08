import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/pages/login/login.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { authGuardGuard } from './shared/guards/auth-guard.guard';
import { MainpageComponent } from './layout/mainpage/mainpage.component';
import { HomeModule } from './modules/home/home.module';
import { MapModule } from './modules/map/map.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { GraphsModule } from './modules//graphs/graphs.module';
import { AccountModule } from './modules/account/account.module';

import { MyeventsModule } from './modules/myevents/myevents.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/event/event.module';

const routes: Routes = [
  {
    path: '',
    component: MainpageComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then((m): typeof HomeModule => m.HomeModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./modules/map/map.module').then((m): typeof MapModule => m.MapModule),
        canActivate: [authGuardGuard]
      },
      {
        path: 'calendar',
        loadChildren: () => import('./modules/calendar/calendar.module').then((m): typeof CalendarModule => m.CalendarModule),
        canActivate: [authGuardGuard]
      },
      {
        path: 'graphics',
        loadChildren: () => import('./modules/graphs/graphs.module').then((m): typeof GraphsModule => m.GraphsModule),
        canActivate: [authGuardGuard]
      },
      {
        path: 'myaccount',
        loadChildren: () => import('./modules/account/account.module').then((m): typeof AccountModule => m.AccountModule),
        canActivate: [authGuardGuard]
      },
      {
        path: 'myevents',
        loadChildren: () => import('./modules/myevents/myevents.module').then((m): typeof MyeventsModule => m.MyeventsModule),
        canActivate: [authGuardGuard]
      },
      {
        path: 'event',
        loadChildren: () => import('./modules/event/event.module').then((m): typeof EventModule => m.EventModule),
        canActivate: [authGuardGuard]
      },
      {
        path: '**',
        redirectTo: 'home'
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule ,
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
