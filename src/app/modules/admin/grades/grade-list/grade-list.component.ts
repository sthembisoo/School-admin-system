import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GradeService } from '../../tools/_services/grade.service';
import { ConfirmationUtilService } from '../../tools/_utils/confirmationUtil.service';
import { AddGradeComponent } from '../_modals/add-grade/add-grade.component';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent implements OnInit {
  @ViewChild('recentTransactionsTable', { read: MatSort })
  gradesTableMatSort: MatSort;

  data: any;
  gradesDataSource: MatTableDataSource<any> = new MatTableDataSource();
  gradesTableColumns: string[] = [
      'Grade',
      'Level',
      'Actions',
  ];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
      private gradeService: GradeService,
      private _matDialog: MatDialog,
      private _confirmation: ConfirmationUtilService,
      private router: Router
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ngOnInit() {
      //get grades
      this.getGrades();
  }

  getGrades(): void {
      this.gradeService.getList().then((response) => {
          this.data = [];
         

          response.docs.forEach((type) => {
              this.data.push({ ...type.data(), id: type.id });
            });
            this.data.sort(function(a, b) {
              return a.Grade - b.Grade;
            });
          this.gradesDataSource = new MatTableDataSource(this.data);
  }).catch((error) => {
     
  });
}

  /**
   * Add a new event
   */
  addNewGrade(): void {
      const dialogRef =   this._matDialog.open(AddGradeComponent, {
          autoFocus: false,
          data: {
              event: {},
          },
      });
      dialogRef.afterClosed().subscribe((res) => {
          if (res.action) {
              this.getGrades();
          }
        });
  }

  ViewMoreDetails(id: string, grade: string)
  {
    this.router.navigate(["/grades", id],{ queryParams: { grade: grade} })
  }

  // //deleteEvent
  // deleteEvent(event): void {
  //     this._confirmation.openConfirmationDialog(Dialog.REMOVE).subscribe((res: any) => {
  //         if (res === 'confirmed') {
  //             this.gradeservice
  //                 .delete(event.id)
  //                 .then(() => {
  //                     this.getgrades();
  //                 });
  //         }
  //     });
  // }

  ngAfterViewInit(): void {
      // Make the data source sortable
      this.gradesDataSource.sort = this.gradesTableMatSort;
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