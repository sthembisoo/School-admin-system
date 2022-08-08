import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'app/modules/admin/tools/_services/product.service';
import { ConfirmationUtilService } from 'app/modules/admin/tools/_utils/confirmationUtil.service';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-list-write-off',
  templateUrl: './list-write-off.component.html',
  styleUrls: ['./list-write-off.component.scss']
})
export class ListWriteOffComponent implements OnInit {

  @ViewChild('recentProductsTable', { read: MatSort })
  staffTableMatSort: MatSort;
  data: any;
  temp: string = 'pro';
  hidebutton: boolean = false;
  ProductsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  ProductsTableColumns: string[] = [
    'Name',
    'Product-Type',
    'date',
    'staffmember',
    'Quantity',
    'reason'
  ];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

constructor(
  private _matDialog: MatDialog,
  private Productservice: ProductService,
  private _confirmation: ConfirmationUtilService,
) { }


  ngOnInit(): void {
        this.getAllProducts();
  }



getAllProducts(): void {
  this.Productservice.getWriteOff().then((response) => {
      this.data = [];
      response.docs.forEach((type) => {
          this.data.push({ ...type.data(), id: type.id });
        });
       

}).then((n)=>
{
  this.ProductsDataSource = new MatTableDataSource(this.data);
 // this.ProductsDataSource.data = this.data;
}).catch((error) => {
 
});
}

public openPDF(): void {


    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Write-off.pdf');
    });
  }


  //deleteEvent
  // deleteProducts(staff): void {
  //     this._confirmation.openConfirmationDialog(1).subscribe((res: any) => {
  //         if (res === 'confirmed') {
  //             this.Productservice
  //                 .delete(staff.id)
  //                 .then(() => {
  //                     this.getAllProducts();
  //                 });
  //         }
  //     });
  // }
// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
ngAfterViewInit(): void {
  // Make the data source sortable
  this.ProductsDataSource.sort = this.staffTableMatSort;
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

// addProduct(): void {
//     const dialogRef =   this._matDialog.open(AddProductTypeComponent, {
//         autoFocus: false,
//         data: {
//           Product: {},
//         },
//     });
//     dialogRef.afterClosed().subscribe((res) => {
//         if (res.action) {
//             this.getAllProducts();
//         }
//       });
// }


// editProducts(event): void {
//    
//     const dialogRef =  this._matDialog.open(AddProductTypeComponent, {
//           autoFocus: false,
//           data: {
//             Producttype: event,
//           },
//       });
//       dialogRef.afterClosed().subscribe((res) => {
//           if (res.action) {
//             this.getAllProducts();
//           }
//         });
//   }

}


