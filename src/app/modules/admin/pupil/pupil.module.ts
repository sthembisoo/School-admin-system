/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PupilComponent } from './pupil.component';
import { RegisterPupilComponent } from './register-pupil/register-pupil.component';
import { EditPupilComponent } from './edit-pupil/edit-pupil.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AssignStudentsToActivityComponent } from './_modals/assignStudentsToActivity/assignStudentsToActivity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PupilFeesComponent } from './pupil-fees/pupil-fees.component';
const eRoutes: Route[] = [
    {
      path: 'pupil-list',
      component: ListComponent,
    },
    {
        path: 'pupil-list/edit/:id',
        component:EditPupilComponent,
    },
    {
        path: 'register-pupil',
        component: RegisterPupilComponent,
    },
    {
        path: 'fees/:id',
        component: PupilFeesComponent,
    },
    {
        path: '',
        loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule)
    },
];
@NgModule({
    imports: [CommonModule, SharedModule, RouterModule.forChild(eRoutes), ReactiveFormsModule,FormsModule],
    declarations: [
        PupilComponent,
        RegisterPupilComponent,
        EditPupilComponent,
        ListComponent,
        AssignStudentsToActivityComponent,
        PupilFeesComponent
    ],
})
export class PupilModule {}
