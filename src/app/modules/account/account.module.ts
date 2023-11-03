import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './pages/account/account.component';
import { PasswordUpdateComponent } from './pages/account/components/password-update/password-update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserApiDbService } from 'src/app/data/services/api/user-db-api.service';
import { FormService } from 'src/app/shared/services/form.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    
    // PasswordUpdateComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
  ], providers:[
    UserApiDbService,
    FormService,
    NgbModal
  ]
})
export class AccountModule { }
