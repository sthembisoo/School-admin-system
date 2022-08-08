/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { PupilService } from '@services/pupil.service';
import { StaffMemberService } from '@services/staff-member.service';
import { ConfirmationUtilService } from '@utils/confirmationUtil.service';
import { Dialog } from 'app/modules/admin/tools/_enums/dialog.enum';
import { ToastService } from 'app/modules/admin/tools/_toast/toast.service';
import { Observable, Subject } from 'rxjs';
;

@Component({
    selector: 'app-mark-register',
    templateUrl: './mark-register.component.html',
    styleUrls: ['./mark-register.component.scss'],
})
export class MarkRegisterComponent implements OnInit {
    learners$: Observable<any[]>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    learnerTableMatSort: MatSort;
    classId: string;
    learnerDataSource: MatTableDataSource<any> = new MatTableDataSource();
    selection = new SelectionModel<any>(true, []);
    displayedColumns: string[] = ['select', 'name', 'surname'];
    class: string;

    /**
     * Constructor
     */
    constructor(
        private pupilService: PupilService,
        private staffservice: StaffMemberService,
        private route: ActivatedRoute,
        private _confirmation: ConfirmationUtilService,
        private _toastrService: ToastService,
        private activatedRoute: ActivatedRoute
    ) {
        this.learners$ = this.pupilService.pupils$;

        this.learners$.subscribe((res) => {
            console.log(res);
            this.learnerDataSource = new MatTableDataSource(res);
        });
    }

    ngOnInit(): void {
        // Get the items
        this.learnerDataSource.paginator = this.paginator;
        this.classId = this.route.snapshot.paramMap.get('classId');
        this.activatedRoute.queryParams.subscribe((params) => {
            // Defaults to 0 if no query param provided.
            this.class = params['class'] || 0;
        });
    }

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.learnerDataSource.data.length;
        return numSelected === numRows;
    }
    masterToggle(): void {
        this.isAllSelected()
            ? this.selection.clear()
            : this.learnerDataSource.data.forEach(row =>
                  this.selection.select(row)
              );
    }

    logSelection(): void  {
        this.selection.selected.forEach((s: any) => console.log(s));
    }

    addToAbsentList(): void  {
        const absentObject = {
            classId: this.classId,
            Date: new Date(),
            learnerIds: [],
        };
        this.selection.selected.forEach((s) => {
            absentObject.learnerIds.push({
                id: s.id,
                name: s.Name + ' ' + s.Surname,
            });
        });

        if (absentObject.learnerIds.length !== 0) {
            this._confirmation
                .openConfirmationDialog(Dialog.ADD)
                .subscribe((res: any) => {
                    if (res === 'confirmed') {
                        this.staffservice
                            .AddLearnerToAbsent(absentObject)
                            .then(() => {
                                this._toastrService.showSuccess(
                                    'Learners have been successfully added to the absent list'
                                );
                            });
                    }
                });
        } else {
            console.log(this);
            this._toastrService.showError(
                'Please select 1 or more learners to perform this action! '
            );
        }
    }

    ngAfterViewInit(): void {
        // Make the data source sortable
        // this.learnerTableMatSort.sort = this.learnerTableMatSort;
    }
}
