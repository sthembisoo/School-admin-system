import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { Route, RouterModule } from '@angular/router';
import { PupilListComponent } from './pupil-list/pupil-list.component';
import { SharedModule } from 'app/shared/shared.module';
const routes: Route[] = [
  {
    path: 'activities',
    component: ActivitiesComponent,
  },
  {
      path: 'activities/:id',
      component: PupilListComponent,
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ActivitiesComponent, PupilListComponent]
})
export class ActivitiesModule { }
