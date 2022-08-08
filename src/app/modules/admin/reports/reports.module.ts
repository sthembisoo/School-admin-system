import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { SalesComponent } from './sales-info/sales/sales.component';
import { SharedModule } from 'app/shared/shared.module';
import { SalesReportComponent } from './sales-info/sales-report/sales-report.component';


@NgModule({
  declarations: [
    SalesComponent,
    SalesReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
