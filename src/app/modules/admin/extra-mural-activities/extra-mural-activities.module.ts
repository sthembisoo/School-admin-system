import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraMuralActivitiesComponent } from './extra-mural-activities.component';
import { Route, RouterModule } from '@angular/router';
import { AddActivityComponent } from './_models/add-activity/add-activity.component';
import { SharedModule } from 'app/shared/shared.module';
const extraMuralRoutes: Route[] = [
  {
      path     : '',
      component: ExtraMuralActivitiesComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(extraMuralRoutes)
  ],
  declarations: [ExtraMuralActivitiesComponent,AddActivityComponent]
})
export class ExtraMuralActivitiesModule { }
