import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffMembersRoutingModule } from './staff-members-routing.module';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { StaffMemberService } from '../tools/_services/staff-member.service';


@NgModule({
  declarations: [
    AddStaffComponent,
    ListComponent
  ],
  providers: [StaffMemberService],
  imports: [
    CommonModule,
    SharedModule,
    StaffMembersRoutingModule
  ]
})
export class StaffMembersModule { }
