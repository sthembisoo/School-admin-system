import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Dialog } from '../../tools/_enums/dialog.enum';
import { StaffMemberService } from '../../tools/_services/staff-member.service';
import { ConfirmationUtilService } from '../../tools/_utils/confirmationUtil.service';
import { AddStaffComponent } from '../add-staff/add-staff.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy  {
  @ViewChild('staffMemberTable', { read: MatSort })
  staffTableMatSort: MatSort;
  data: any;
  staffDataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  staffTableColumns: string[] = [
    'Name',
    'Surname',
    'Contact number',
    'Email address',
    'Employment date',
    'Actions',
  ];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _matDialog: MatDialog,
    private staffService: StaffMemberService,
    private _confirmation: ConfirmationUtilService,
) {
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
ngOnInit() {
    this.getAllStaff();
}

getAllStaff(): void {
  this.staffService.getList().then((response) => {
      this.data = [];
     

      response.docs.forEach((type) => {
        if(type.data().staff_Type_ID === 2){
          this.data.push({ ...type.data(), id: type.id });
        }
        });
       
      this.staffDataSource = new MatTableDataSource(this.data);
       this.staffDataSource.data = this.data;
      
}).catch((error) => {
 
});
}
  //deleteEvent
  deleteStaff(staff): void {
      this._confirmation.openConfirmationDialog(1).subscribe((res: any) => {
          if (res === 'confirmed') {
              this.staffService
                  .delete(staff.id)
                  .then(() => {
                      this.getAllStaff();
                  });
          }
      });
  }

ngAfterViewInit(): void {
  // Make the data source sortable
  this.staffDataSource.sort = this.staffTableMatSort;
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

addStaff(): void {
    const dialogRef =   this._matDialog.open(AddStaffComponent, {
        autoFocus: false,
        data: {
            staff: {},
        },
    });
    dialogRef.afterClosed().subscribe((res) => {
        if (res.action) {
            this.getAllStaff();
        }
      });

}

editStaff(event): void {
   
    const dialogRef =  this._matDialog.open(AddStaffComponent, {
          autoFocus: false,
          data: {
              staff: event,
          },
      });
      dialogRef.afterClosed().subscribe((res) => {
          if (res.action) {
            this.getAllStaff();
          }
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.staffDataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.staffDataSource.paginator) {
      this.staffDataSource.paginator.firstPage();
    }
  }

}
