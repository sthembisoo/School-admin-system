import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventsService } from 'app/modules/admin/tools/_services/events.service';
import { ConfirmationUtilService } from 'app/modules/admin/tools/_utils/confirmationUtil.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AddIncomeComponent } from '../../_modals/add-Income/add-Income.component';

@Component({
  selector: 'app-event-income',
  templateUrl: './event-income.component.html',
  styleUrls: ['./event-income.component.scss']
})
export class EventIncomeComponent implements OnInit, AfterViewInit, OnDestroy {

  eventsTableMatSort: MatSort;

  data: any;
  eventsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  eventsTableColumns: string[] = [
      'Description',
      'Date',
      'Time',
      'EventType',
      'Event_Cost',
      'Income',
      'Status',
      'Actions',
  ];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
      private eventService: EventsService,
      private _matDialog: MatDialog,
      private _confirmation: ConfirmationUtilService
  ) {
    this.getEvents();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ngOnInit() {

      //get events


     
  }

  getEvents(): void {
      this.eventService.getListFiltered('Status', 'Finished').subscribe((response) => {
            this.data = [];
            this.data  = response.map((a) => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                const type = a.type;
             this.eventService.getEventInformation(id).pipe(
                  map(((res:  any) => {
                  const data2 = res.payload.data();                  // this.eventTypes = [...data.docs];
                }))).subscribe((res) => {
                  // eslint-disable-next-line @typescript-eslint/naming-convention

                });

                data.Income_Cost = 555;
                return { id, type, ...data};
              });

              //assign to datasource
                this.eventsDataSource.data = this.data;
            // this.eventTypes = [...data.docs];
      });
  }

  /**
   * Add a new event
   */
  updateEventIncome(event): void {
    const dialogRef =  this._matDialog.open(AddIncomeComponent, {
          autoFocus: false,
          data: {
              event: {event},
          },
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (res.action) {
            this.getEvents();
        }
      });
  }
  ngAfterViewInit(): void {
    // Make the data source sortable
    this.eventsDataSource.sort = this.eventsTableMatSort;
}

/**
 * On destroy
 */
ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
}

trackByFn(index: number, item: any): any {
    return item.eventID || index;
}

}
