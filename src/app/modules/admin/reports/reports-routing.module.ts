import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesReportComponent } from './sales-info/sales-report/sales-report.component';
import { SalesComponent } from './sales-info/sales/sales.component';

const routes: Routes = [

    {
        path: 'sales',
        component: SalesComponent,

},
{
    path: 'sales-report',
    component: SalesReportComponent,

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
