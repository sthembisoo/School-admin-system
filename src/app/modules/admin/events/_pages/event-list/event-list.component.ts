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
import { Dialog } from 'app/modules/admin/tools/_enums/dialog.enum';
import { ConfirmationUtilService } from 'app/modules/admin/tools/_utils/confirmationUtil.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventType } from '../../../tools/models/eventType';
import { EventsService } from '../../../tools/_services/events.service';
import { AddEventComponent } from '../../_modals/add-event/add-event.component';
@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit, AfterViewInit, OnDestroy {
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
        'Status',
        'Actions',
    ];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private eventService: EventsService,
        private _matDialog: MatDialog,
        private _confirmation: ConfirmationUtilService
    ) {}

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ngOnInit() {
        //get events
        this.getEvents();
    }

    getEvents(): void {
        this.eventService
            .getList()
            .then((response) => {
                this.data = [];
                response.docs.forEach((type) => {
                    this.data.push({ ...type.data(), id: type.id });
                });
                this.eventsDataSource = new MatTableDataSource(this.data);
            })
            .catch((error) => {
               
            });
    }

    /**
     * Add a new event
     */
    addNewEvent(): void {
        const dialogRef = this._matDialog.open(AddEventComponent, {
            autoFocus: false,
            data: {
                event: {},
            },
        });
        dialogRef.afterClosed().subscribe((res) => {
            if (res.action) {
                this.getEvents();
            }
        });
    }

    editEvent(event): void {
        const dialogRef = this._matDialog.open(AddEventComponent, {
            autoFocus: false,
            data: {
                event: event,
            },
        });
        dialogRef.afterClosed().subscribe((res) => {
            if (res.action) {
                this.getEvents();
            }
        });
    }

    //deleteEvent
    deleteEvent(event): void {
        this._confirmation
            .openConfirmationDialog(Dialog.REMOVE)
            .subscribe((res: any) => {
                if (res === 'confirmed') {
                    this.eventService.delete(event.id).then(() => {
                        this.getEvents();
                    });
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
