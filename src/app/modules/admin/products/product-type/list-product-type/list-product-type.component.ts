import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductTypesService } from 'app/modules/admin/tools/_services/product-types.service';
import { ConfirmationUtilService } from 'app/modules/admin/tools/_utils/confirmationUtil.service';
import { Subject } from 'rxjs';
import { AddProductTypeComponent } from '../add-product-type/add-product-type.component';

@Component({
  selector: 'app-list-product-type',
  templateUrl: './list-product-type.component.html',
  styleUrls: ['./list-product-type.component.scss']
})
export class ListProductTypeComponent implements OnInit {

  @ViewChild('recentProductsTable', { read: MatSort })
  staffTableMatSort: MatSort;
  data: any;
  temp: string = 'pro';
  ProductsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  ProductsTableColumns: string[] = [
    'Name',
    'Actions'
  ];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

constructor(
  private _matDialog: MatDialog,
  private Productservice: ProductTypesService,
  private _confirmation: ConfirmationUtilService,
  private router: Router
) { }


  ngOnInit(): void {
        this.getAllProducts();
  }

ngOnChages(): void {

//  this.router.navigate(['../staff-product-list']);

}


getAllProducts(): void {
  this.Productservice.getList().then((response) => {
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
  //deleteEvent
  deleteProducts(staff): void {
      this._confirmation.openConfirmationDialog(1).subscribe((res: any) => {
          if (res === 'confirmed') {
              this.Productservice
                  .delete(staff.id)
                  .then(() => {
                      this.getAllProducts();
                  });
          }
      });
  }
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
    const dialogRef =   this._matDialog.open(AddProductTypeComponent, {
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
editProducts(event): void {
   
    const dialogRef =  this._matDialog.open(AddProductTypeComponent, {
          autoFocus: false,
          data: {
            Producttype: event,
          },
      });
      dialogRef.afterClosed().subscribe((res) => {
          if (res.action) {
            this.getAllProducts();
          }
        });
  }

}
