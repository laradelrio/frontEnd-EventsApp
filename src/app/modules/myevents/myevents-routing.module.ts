import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyeventsComponent } from './pages/myevents/myevents.component';
import { AddComponent } from './pages/add/add.component';
import { UpdateComponent } from './pages/update/update.component';

const routes: Routes = [
  {path: '', component: MyeventsComponent},
  {path: 'add', component: AddComponent},
  {path: 'update', component: UpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyeventsRoutingModule { }
