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
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Dialog } from '../../tools/_enums/dialog.enum';
import { PupilService } from '../../tools/_services/pupil.service';
import { ConfirmationUtilService } from '../../tools/_utils/confirmationUtil.service';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('recentpupilTable', { read: MatSort })
    pupilTableMatSort: MatSort;
    data: any;
    pupilDataSource: MatTableDataSource<any> = new MatTableDataSource();
    pupilTableColumns: string[] = ['Name', 'Surname', 'StudentFees', 'Actions'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _matDialog: MatDialog,
        private pupilService: PupilService,
        private _confirmation: ConfirmationUtilService,
        private _router: Router
    ) {}

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ngOnInit() {
        this.getPupil();
    }

    getPupil(): void {
        this.pupilService
            .getList()
            .then((response) => {
                this.data = [];

                response.docs.forEach((type) => {
                    this.data.push({ ...type.data(), id: type.id });
                });
                this.pupilDataSource = new MatTableDataSource(this.data);
            })
            .catch((error) => {});
    }
    //deleteEvent
    deletePupil(pupil): void {
        this._confirmation.openConfirmationDialog(1).subscribe((res: any) => {
            if (res === 'confirmed') {
                this.pupilService.delete(pupil.id).then(() => {
                    this.getPupil();
                });
            }
        });
    }

    ngAfterViewInit(): void {
        // Make the data source sortable
        this.pupilDataSource.sort = this.pupilTableMatSort;
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
    registerLearner(): void {
        //navigate to register-pupil
        this._router.navigate(['pupil/register-pupil']);
    }

    ediPupil(id): void {
        //navigate to register-pupil
        this._router.navigate(['pupil/pupil-list/edit', id]);
    }

    viewPupilFees(id): void {
        //navigate to register-pupil
        this._router.navigate(['pupil/fees', id]);
    }
}

