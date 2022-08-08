import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AddEventComponent } from './_modals/add-event/add-event.component';
import { EventIncomeComponent } from './_pages/event-income/event-income.component';
import { EventListComponent } from './_pages/event-list/event-list.component';
import { AddIncomeComponent } from './_modals/add-Income/add-Income.component';
import { EventsService } from '../tools/_services/events.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

const eventsRoutes: Route[] = [
  {
      path     : '',
      component: EventsComponent
  },
  {
      path: 'event-income',
      component: EventIncomeComponent
  },
  {
      path: 'event-list',
      component: EventListComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(eventsRoutes),
    SharedModule,
    AngularFireModule,
    AngularFireAuthModule,
  ],
  declarations: [EventsComponent,AddEventComponent,EventIncomeComponent,EventListComponent,AddIncomeComponent],
  providers: [EventsService],
})
export class EventsModule { }
