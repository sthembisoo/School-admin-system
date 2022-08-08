/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AddGradeComponent } from './_modals/add-grade/add-grade.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { ListComponent } from './grade-details/class-list/list.component';
import { AddClassComponent } from './_modals/addClass/addClass.component';
import { ClassModule } from 'app/shared/class-list/list.module';

const gradesRoutes: Route[] = [
  {
    path     : '',
    component: GradeListComponent
  },
  {
      path     : ':gradeId',
      component: ListComponent
  },
  {
      path: ':gradeId/:classId',
      loadChildren: () => import('app/modules/admin/grades/grade-details/class-details/grade-details.module').then(m => m.GradeDetailsModule)
  },
  {
      path: 'event-list',
      // component: EventListComponent
  }
];

@NgModule({
  declarations: [ListComponent,GradeListComponent,AddGradeComponent,AddClassComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(gradesRoutes),
    SharedModule,
    ClassModule
  ]
})
export class GradesModule { }
