import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AddAdministratorComponent } from './add-administrator/add-administrator.component';
import { ListComponent } from './list/list.component';

const routes: Route[] = [
    {
      path: 'administrators-list',
      component: ListComponent,
    },
     {
         path: 'add-administrator',
         component: AddAdministratorComponent,
     },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorsRoutingModule { }
