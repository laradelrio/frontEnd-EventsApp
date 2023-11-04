import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyeventsComponent } from './pages/myevents/myevents.component';
import { AddComponent } from './pages/add/add.component';

const routes: Routes = [
  {path: '', component: MyeventsComponent},
  {path: 'add', component: AddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyeventsRoutingModule { }
