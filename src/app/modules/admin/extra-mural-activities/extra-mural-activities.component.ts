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
import { Dialog } from '../tools/_enums/dialog.enum';
import { ExtraMuralActivitiesService } from '../tools/_services/extra-mural-activities.service';
import { ConfirmationUtilService } from '../tools/_utils/confirmationUtil.service';
import { AddActivityComponent } from './_models/add-activity/add-activity.component';

@Component({
    selector: 'app-extra-mural-activities',
    templateUrl: './extra-mural-activities.component.html',
    styleUrls: ['./extra-mural-activities.component.scss'],
})
export class ExtraMuralActivitiesComponent
    implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('recentActivitiesTable', { read: MatSort })
    activitiesTableMatSort: MatSort;

    data: any;
    activitiesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    activitiesTableColumns: string[] = [
        'Description',
        'Date',
        'Time',
        'ActivityType',
        'Actions',
    ];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private activityService: ExtraMuralActivitiesService,
        private _matDialog: MatDialog,
        private _confirmation: ConfirmationUtilService
    ) {}

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ngOnInit() {
        //get getActivities
        this.getActivities();
    }


    getActivities(): void {
        this.activityService.getList().then((response) => {
            this.data = [];
            response.docs.forEach((type) => {
                this.data.push({ ...type.data(), id: type.id });
              });
            this.activitiesDataSource = new MatTableDataSource(this.data);
    }).catch((error) => {
       
    });
}

    /**
     * Add a new Activity
     */
    addNewActivity(): void {
        const dialogRef = this._matDialog.open(AddActivityComponent, {
            autoFocus: false,
            data: {
            },
        });
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res.action) {
                this.getActivities();
            }
        });
    }

    editActivity(_activity): void {
        const dialogRef = this._matDialog.open(AddActivityComponent, {
            autoFocus: false,
            data: {
                activity: _activity,
            },
        });
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res.action) {
                this.getActivities();
            }
        });
    }

    //deleteActivity
    deleteActivity(_activity): void {
        this._confirmation.openConfirmationDialog(Dialog.REMOVE).subscribe((res: any) => {
            if (res === 'confirmed') {
                this.activityService
                    .delete(_activity.id)
                    .then(() => {
                        this.getActivities();
                    });
            } else {
            }
        });
    }

    ngAfterViewInit(): void {
        // Make the data source sortable
        this.activitiesDataSource.sort = this.activitiesTableMatSort;
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
        return item.ActivityID || index;
    }
}
