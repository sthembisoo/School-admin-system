import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyClassesComponent } from './my-classes.component';
import { ClassModule } from 'app/shared/class-list/list.module';
import { ActivatedRouteSnapshot, Route, RouterModule } from '@angular/router';
import { MarkRegisterComponent } from './mark-register/mark-register.component';
import { ViewRegisterComponent } from './view-register/view-register.component';
import { SharedModule } from 'app/shared/shared.module';
import { PupilsResolver } from 'app/modules/admin/grades/grade-details/class-details/grade-manager.resolvers';

const routes: Route[] = [
  {
    path     : '',
    component: MyClassesComponent
  },
  {
      path     : ':classId',
      component: MarkRegisterComponent,
      resolve  : {
        items: PupilsResolver
    },
  },
  {
      path: 'register/:classId',
      component: ViewRegisterComponent,
      resolve  : {
        items: PupilsResolver
    },
  }
];
@NgModule({
  imports: [
    CommonModule,
    ClassModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyClassesComponent,MarkRegisterComponent,ViewRegisterComponent],
  providers: []
})
export class MyClassesModule { }
