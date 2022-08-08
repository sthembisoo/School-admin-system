import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventType } from '../tools/models/eventType';
import { EventsService } from '../tools/_services/events.service';
import { AddEventComponent } from './_modals/add-event/add-event.component';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    providers: [EventsService],
})
export class EventsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('recentTransactionsTable', { read: MatSort })
    eventsTableMatSort: MatSort;

    data: any;
    eventsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    eventsTableColumns: string[] = [
        'Description',
        'Date',
        'Time',
        'EventType',
        'Event_Cost',
        'Actions',
    ];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        // private eventService: EventsService,
        private _matDialog: MatDialog
    ) {}

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ngOnInit() {
        //get events
      // this.getEvents();
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
