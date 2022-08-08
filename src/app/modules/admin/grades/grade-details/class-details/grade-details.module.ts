import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeDetailsComponent } from './grade-details.component';
import { RouterModule } from '@angular/router';
import { gradesRoutes } from './grade-manager.routing';
import { SharedModule } from 'app/shared/shared.module';
import { LearnerInfoComponent } from './learner-info/learner-info.component';
import { LearnerListComponent } from './learner-list/learner-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByKeyPipeModule } from '../../../tools/_pipes/filter-by-key-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(gradesRoutes),
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    FilterByKeyPipeModule
  ],
  declarations: [GradeDetailsComponent,LearnerInfoComponent,LearnerListComponent]
})
export class GradeDetailsModule { }
