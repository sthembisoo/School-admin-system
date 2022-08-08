import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ListComponent } from './list/list.component';

const routes: Route[] = [
  {
    path: 'staff-list',
    component: ListComponent,
  },
  {
      path: 'add-staff',
      component: AddStaffComponent,
  },
  {
      path: 'staff-list/edit/:id',
      component:AddStaffComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffMembersRoutingModule { }
