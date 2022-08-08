import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorsRoutingModule } from './administrators-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { AddAdministratorComponent } from './add-administrator/add-administrator.component';
import { StaffMemberService } from '../tools/_services/staff-member.service';
import { ListComponent } from './list/list.component';
import { initializeApp } from 'firebase/app';


@NgModule({
  declarations: [
    AddAdministratorComponent,
    ListComponent
  ],
  providers: [StaffMemberService],
  imports: [
    CommonModule,
    SharedModule,
    AdministratorsRoutingModule
  ]
})
export class AdministratorsModule { }
