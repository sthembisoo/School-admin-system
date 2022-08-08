import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';


const routes: Route[] = [
    {
      path: 'administrators-list',
      component: SupplierListComponent,
    },
     {
         path: 'add-administrator',
         component: AddSupplierComponent,
     },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
