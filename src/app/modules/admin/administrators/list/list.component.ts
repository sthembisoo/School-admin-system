/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { Dialog } from '../../tools/_enums/dialog.enum';
import { EventsService } from '../../tools/_services/events.service';
import { StaffMemberService } from '../../tools/_services/staff-member.service';
import { ConfirmationUtilService } from '../../tools/_utils/confirmationUtil.service';
import { AddAdministratorComponent } from '../add-administrator/add-administrator.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy  {

    administratorsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    administratorTableMatSort: MatSort;
    data: any;
    administratorsTableColumns: string[] = [
       'Name',
       'RoleDescription',
       'Email address',
       'userAuth',
       'dateCreated',
       'Actions',
   ];
   private _unsubscribeAll: Subject<any> = new Subject<any>();

     constructor( private _matDialog: MatDialog,
       private staffService: StaffMemberService,
       private _confirmation: ConfirmationUtilService
       ) { }

     ngOnInit(): void {
      this.getAdministrators();
     }

     addAdministrator(): void {
       const dialogRef =   this._matDialog.open(AddAdministratorComponent, {
           autoFocus: false,
           data: {
               staff: {},
           },
       });
       dialogRef.afterClosed().subscribe((res) => {
           if (res.action) {
               this.getAdministrators();
           }
         });
     }


     editAdministrator(event): void {
       const dialogRef =  this._matDialog.open(AddAdministratorComponent, {
             autoFocus: false,
             data: {
                 staff: event,
             },
         });
         dialogRef.afterClosed().subscribe((res) => {
             if (res.action) {
                 this.getAdministrators();
             }
           });
     }

      getAdministrators(): void {
       this.staffService.getList().then((response) => {
           this.data = [];
                response.docs.forEach((type) => {
           //    if(type.data().staff_Type_ID === 1){
               this.data.push({ ...type.data(), id: type.id, Role:type.data().userAuth.map(yy => yy.title).join(', ') });
              //  console.log('this is index', response.docs.findIndex(x=> x.data().name === type.data().name))
                //  this.data[response.docs.findIndex(x=> x.data().name === type.data().name)].Role =
                //  type.data().userAuth.map(yy => yy.title).join(', ');
                console.log('this is index', this.data)
            //   }
             });
           this.administratorsDataSource = new MatTableDataSource(this.data);
           this.administratorsDataSource.data = this.data;
   }).then((ad)=>
   {
//     let count = 0
//    // console.log('this is index', this.data)
//     this.data.forEach(adv=> {
//         console.log('this is index', adv)
//         this.data[count].Role =  adv.userAuth.map(yy => yy.title).join(', ');
//         console.log('this is index', this.data)
//         count++
//    })
   })
   .catch((error) => {

   });
   }

       deleteAdministrator(event): void {
           this._confirmation.openConfirmationDialog(Dialog.REMOVE).subscribe((res: any) => {
               if (res === 'confirmed') {
                   this.staffService
                       .delete(event.id)
                       .then(() => {
                           this.getAdministrators();
                       });
               }
           });
       }


   // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
   ngAfterViewInit(): void {
       // Make the data source sortable
       this.administratorsDataSource.sort = this.administratorTableMatSort;
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
