import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyeventsComponent } from './pages/myevents/myevents.component';

const routes: Routes = [
  {path: '', component: MyeventsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyeventsRoutingModule { }
