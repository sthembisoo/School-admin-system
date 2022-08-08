import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ProductService } from '../../tools/_services/product.service';
import { ConfirmationUtilService } from '../../tools/_utils/confirmationUtil.service';
import { AddStockTakeComponent } from './add-stock-take/add-stock-take.component';

@Component({
  selector: 'app-stocktake',
  templateUrl: './stocktake.component.html',
  styleUrls: ['./stocktake.component.scss']
})
export class StocktakeComponent implements OnInit {

  @ViewChild('recentProductsTable', { read: MatSort })
  staffTableMatSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizes = [3, 5, 7];
  data: any;
  ProductsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  ProductsTableColumns: string[] = [
    'date',
    'Name',
    'Product-Type',
    'staffmember',
    'Quantity',
    'Status',
    'Revised',
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
  this.Productservice.getStockTake().then((response) => {
      this.data = [];
      response.docs.forEach((type) => {
          this.data.push({ ...type.data(), id: type.id });
        });
       

}).then((n)=>
{
    this.ProductsDataSource = new MatTableDataSource(this.data);
    this.ProductsDataSource.paginator = this.paginator;
}).catch((error) => {
 
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

addProduct(): void {
    const dialogRef =   this._matDialog.open(AddStockTakeComponent, {
        autoFocus: false,
        data: {
          Product: {},
        },
    });
    dialogRef.afterClosed().subscribe((res) => {
        if (res.action) {
            this.getAllProducts();
        }
      });
}


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


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.ProductsDataSource.filter = filterValue.trim().toLowerCase();

  if (this.ProductsDataSource.paginator) {
    this.ProductsDataSource.paginator.firstPage();
  }
}


}
