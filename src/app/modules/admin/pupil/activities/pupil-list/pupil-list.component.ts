import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ComparisonOperators } from 'app/modules/admin/tools/_enums/comparison-operators.enum';
import { PupilService } from 'app/modules/admin/tools/_services/pupil.service';
import { ConfirmationUtilService } from 'app/modules/admin/tools/_utils/confirmationUtil.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssignStudentsToActivityComponent } from '../../_modals/assignStudentsToActivity/assignStudentsToActivity.component';

@Component({
  selector: 'app-pupil-list',
  templateUrl: './pupil-list.component.html',
  styleUrls: ['./pupil-list.component.scss']
})
export class PupilListComponent implements  OnInit, AfterViewInit, OnDestroy  {

  @ViewChild('recentpupilTable', { read: MatSort })
  pupilTableMatSort: MatSort;
  data: any;
  allStudents: any[] = [];
  pupilDataSource: MatTableDataSource<any> = new MatTableDataSource();
  pupilTableColumns: string[] = [
      'Name',
      'Surname',
      'PupilType',
      'Actions',
  ];
  public activityName: string;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private id = null;

  constructor(
    private _matDialog: MatDialog,
    private pupilService: PupilService,
    private _router: Router,
    private _confirmation: ConfirmationUtilService,
    private activatedRoute: ActivatedRoute
  ) { }

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
ngOnInit() {
  //get id from route
  this.id = this.activatedRoute.snapshot.paramMap.get('id');
  this.activityName = this.activatedRoute.snapshot.queryParamMap.get('activityName');
    //get getActivities
    // this.getPupilsInActivity();
    this.getPupils();
    this.getPupilsInAct();
}

// getPupils(): void {
//   this.pupilService.getList().then((response) => {
//     this.data = [];
//     response.docs.forEach((type) => {
//         this.allStudents.push({ ...type.data(), id: type.id });
//       });
// }).catch((error) => {
//
// });
// }

getPupils(): void {
  this.pupilService.getListFilteredWithCondition('activities',ComparisonOperators.notIn , [[this.id]]).subscribe((response) => {
        this.allStudents  = response.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            const type = a.type;
            return { id, type, ...data };
          });

         
  });
}

getPupilsInActivity(): void {
  this.pupilService
      .getStudentsInType(this.id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
          this.data = response;
          this.pupilDataSource.data = this.data;
      });
}

getPupilsInAct(): void {
  this.pupilService.getListFilteredWithCondition('activities',ComparisonOperators.arrayContains, this.id).subscribe((response) => {
        this.data = [];
        this.data  = response.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            const type = a.type;
            return { id, type, ...data };
          });
          //assign to datasource
            this.pupilDataSource.data = this.data;
  });
}

assignStudentsToActivity(): void {
  //assign students to activity modal
  const dialogRef = this._matDialog.open(AssignStudentsToActivityComponent, {
    data: {
      activityId: this.id,
      pupils: this.allStudents
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

trackByFn(index, item: any): any {
   
    return item.id ||  index;
}
registerLearner(): void {
  //navigate to register-pupil
  this._router.navigate(['pupil/register-pupil']);

}
}
