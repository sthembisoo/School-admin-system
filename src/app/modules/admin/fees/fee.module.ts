import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeesRoutingModule } from './fees-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { StaffMemberService } from '../tools/_services/staff-member.service';
import { ListComponent } from './list/list.component';
import { initializeApp } from 'firebase/app';
import { FeesService } from '@services/Fees.service';
import { AddFeeComponent } from './add-fee/add-fee.component';


@NgModule({
  declarations: [
    AddFeeComponent,
    ListComponent
  ],
  providers: [FeesService],
  imports: [
    CommonModule,
    SharedModule,
    FeesRoutingModule
  ]
})
export class FeesModule { }
