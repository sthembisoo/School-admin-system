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
  selector: 'app-view-register',
  templateUrl: './view-register.component.html',
  styleUrls: ['./view-register.component.scss']
})
export class ViewRegisterComponent implements OnInit {

  learners$: Observable<any[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  learnerTableMatSort: MatSort;
  classId: string;
  learnerDataSource: MatTableDataSource<any> = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select', 'name', 'surname'];
  class: string;

  absentLearners: any[] = [];

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
      });
  }

  ngOnInit(): void {
    this.getAbsentList();
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

  getAbsentList() {
    this.staffservice.getAbsentLearners().then(res =>{
      console.log( this.absentLearners);
      res.docs.forEach((type) =>
      {
        if(type.data().classId === this.classId)
          this.absentLearners = [...type.data().learnersIds]
      })

      console.log( this.absentLearners);
    })
  }

  logSelection(): void  {
      this.selection.selected.forEach((s: any) => console.log(s));
  }


  ngAfterViewInit(): void {
      // Make the data source sortable
      // this.learnerTableMatSort.sort = this.learnerTableMatSort;
  }
}
