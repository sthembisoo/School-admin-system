/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductService } from '../../tools/_services/product.service';
import { ConfirmationUtilService } from '../../tools/_utils/confirmationUtil.service';
import { AddProductsComponent } from '../add-products/add-products.component';
import { WriteOffComponent } from '../write-off/write-off.component';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('recentProductsTable', { read: MatSort })
    staffTableMatSort: MatSort;
    data: any;
    temp: string = 'pro';
    ProductsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ProductsTableColumns: string[] = [
      'Name',
      'Product Type',
      'Price',
      'Quantity',
      'Actions',
    ];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _matDialog: MatDialog,
    private Productservice: ProductService,
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
            this.data.push({ ...type.data(), Id: type.id });
          });
         

  }).then((n)=>
  {
    this.ProductsDataSource = new MatTableDataSource(this.data);
   // this.ProductsDataSource.data = this.data;
  }).catch((error) => {
   
  });
  }
    //deleteEvent
    deleteProducts(event): void {
        this._confirmation.openConfirmationDialog(1).subscribe((res: any) => {
            if (res === 'confirmed') {
                this.Productservice
                    .delete(event.id)
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
      const dialogRef =   this._matDialog.open(AddProductsComponent, {
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
  editProduct(event): void {
     
      const dialogRef =  this._matDialog.open(AddProductsComponent, {
            autoFocus: false,
            data: {
              Product: event,
            },
        });
        dialogRef.afterClosed().subscribe((res) => {
            if (res.action) {
              this.getAllProducts();
            }
          });
    }

    writeOff(product)
    {
     
      const dialogRef =  this._matDialog.open(WriteOffComponent, {
            autoFocus: false,
            data: {
              Product: product,
            },
        });
        dialogRef.afterClosed().subscribe((res) => {
            if (res.action) {
              this.getAllProducts();
            }
          });
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.ProductsDataSource.filter = filterValue.trim().toLowerCase();
    
      if (this.ProductsDataSource.paginator) {
        this.ProductsDataSource.paginator.firstPage();
      }
    }
    

}
