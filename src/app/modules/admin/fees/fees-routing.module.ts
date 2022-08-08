import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AddFeeComponent } from './add-fee/add-fee.component';
import { ListComponent } from './list/list.component';

const routes: Route[] = [
    {
      path: '',
      component: ListComponent,
    },
     {
         path: 'add-fee',
         component: AddFeeComponent,
     },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
