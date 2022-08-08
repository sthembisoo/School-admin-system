import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from '@services/product.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

    data: any[];
    ProductsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    ProductsTableColumns: string[] = [
       'SaleId',
        'date',
        'parent',
        'Amount',
        'Actions',
      ];
      @ViewChild('recentProductsTable', { read: MatSort })
      private _unsubscribeAll: Subject<any> = new Subject<any>();
      staffTableMatSort: MatSort;


  constructor(
    private Productservice: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllSales()

  }

  getAllSales()
  {
        this.Productservice.getSale().then((response) => {
            this.data = [];
            response.docs.forEach((type) =>
            {
                this.data.push({...type.data(), Id: type.id})
            })
        }).then((n)=>
        {
            console.log(this.data)
          this.ProductsDataSource = new MatTableDataSource(this.data);
         // this.ProductsDataSource.data = this.data;
        }).catch((error) => {

        });
  }

  viewDocument(info)
  {
    this.Productservice.sales = info
    console.log(info)
    this.router.navigateByUrl('reports/sales-report')

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
    //   ngOnDestroy(): void {
    //       // Unsubscribe from all subscriptions
    //       this._unsubscribeAll.next();
    //       this._unsubscribeAll.complete();
    //   }
      trackByFn(index: number, item: any): any {
          return item.ActivityID || index;
      }



}
