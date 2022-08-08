/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FeesService } from '@services/Fees.service';
import { Subject } from 'rxjs/internal/Subject';
import { Dialog } from '../../tools/_enums/dialog.enum';
import { StaffMemberService } from '../../tools/_services/staff-member.service';
import { ConfirmationUtilService } from '../../tools/_utils/confirmationUtil.service';
import { AddFeeComponent } from '../add-fee/add-fee.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy  {

    feesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    FeeTableMatSort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
      pageSizes = [3, 5, 7];
    data: any;
    feesTableColumns: string[] = [
       'Grade',
       'PaymentType',
       'StationaryAndWorkbook',
       'NewLearnerFee',
   ];
   private _unsubscribeAll: Subject<any> = new Subject<any>();

     constructor( private _matDialog: MatDialog,
       private feesService: FeesService,
       private _confirmation: ConfirmationUtilService
       ) { }

     ngOnInit(): void {
      this.getfees();
     }

     AddNewFee(): void {
       const dialogRef =   this._matDialog.open(AddFeeComponent, {
           autoFocus: false,
           data: {
               staff: {},
           },
       });
       dialogRef.afterClosed().subscribe((res) => {
           if (res.action) {
               this.getfees();
           }
         });
     }


     editFee(fees): void {
       const dialogRef =  this._matDialog.open(AddFeeComponent, {
             autoFocus: false,
             data: {
                 fee: fees,
             },
         });
         dialogRef.afterClosed().subscribe((res) => {
             if (res.action) {
                 this.getfees();
             }
           });
     }

      getfees(): void {
       this.feesService.getList().then((response) => {
           this.data = [];
          
           response.docs.forEach((type) => {
               this.data.push({ ...type.data(), id: type.id });
             });

             console.log(this.data)
           this.feesDataSource = new MatTableDataSource(this.data);
           this.feesDataSource.data = this.data;
           this.feesDataSource.paginator = this.paginator;
          
   }).catch((error) => {
      
   });
   }

       deleteFee(fees): void {
           this._confirmation.openConfirmationDialog(Dialog.REMOVE).subscribe((res: any) => {
               if (res === 'confirmed') {
                   this.feesService
                       .delete(fees.id)
                       .then(() => {
                           this.getfees();
                       });
               }
           });
       }


   // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
   ngAfterViewInit(): void {
       // Make the data source sortable
       this.feesDataSource.sort = this.FeeTableMatSort;

       this.feesDataSource.paginator = this.paginator;
     }

     applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.feesDataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.feesDataSource.paginator) {
          this.feesDataSource.paginator.firstPage();
        }
      }
    

   /**
    * On destroy
    */
   // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
   ngOnDestroy(): void {
       // Unsubscribe from all subscriptions
       this._unsubscribeAll.next();
       this._unsubscribeAll.complete();
   }

   trackByFn(index: number, item: any): any {
       return item.ActivityID || index;
   }
}
