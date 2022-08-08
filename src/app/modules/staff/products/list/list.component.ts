/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductService } from 'app/modules/admin/tools/_services/product.service';
import { AngularFireStorage, AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { ConfirmationUtilService } from 'app/modules/admin/tools/_utils/confirmationUtil.service';
import { Dialog } from 'app/modules/admin/tools/_enums/dialog.enum';
import { MatDialog } from '@angular/material/dialog';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],



})
export class ListComponent implements OnInit {


  //  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    products: any[] = [];
    uurl: string;
    pictureArr: any[];
    show: boolean = false;
    ProductQuantity: number;
    count: number = 1;
    filters: string[] = ['all', 'article', 'listing', 'list', 'info', 'shopping', 'pricing', 'testimonial', 'post', 'interactive'];
    numberOfCards: any = {};
    selectedFilter: string = 'all';
    cartQuantity: number = 0;

  constructor(
    private Productservice: ProductService,
    private afStorage: AngularFireStorage,
    private _confirmation: ConfirmationUtilService,
    private _matDialog: MatDialog,
    private router: Router,
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {

  }
    ngOnInit(): void {

        this.getAllProducts();
        this.cartQuantity = this.Productservice.cartQuantity;
           // Mark for check
           this._changeDetectorRef.markForCheck();


    }


getAllProducts() {
    this.Productservice.getList().then((response) => {
        this.products = [];
        response.docs.forEach((type) => {
     this.products.push({ ...type.data(), Id: type.id,
     });
          });
  }).then((x)=>
  {
    this.products.forEach((pro) =>
    {
      this.show = true;
        this.afStorage.ref(pro.Id).getDownloadURL().subscribe((data)=>
        {
          pro.pictureURL = data;


        });
    });
  }).catch((error) => {
  });
  return this.products;
}

  /**
     * On backdrop clicked
     */
   onBackdropClicked(): void {
    // Go back to the list
    this._router.navigate(['./']);

    // Mark for check
    this._changeDetectorRef.markForCheck();
}

selectProduct(event )
{

    // const dialogRef = this._matDialog.open(DialogProductComponent,{

    // data:{
    //     event: {event}
    // },

    // });
    // dialogRef.afterClosed().subscribe((res)=>{
    //      if(res.action){

    //         this.getAllProducts();
    //   }
    // });
   let Exists =  this.Productservice.cartProducts.find((result)=>
       { return result.Id === event.Id
       }
    )
        if(Exists === undefined){
          this.cartQuantity++;
         this.Productservice.cartProducts.push(event);
        }
        this.Productservice.cartQuantity = this.cartQuantity;
}

goToCart()
{
    this.router.navigateByUrl('staff-Products/Cart')
 // this.matDrawer.open();
}

// onFilterChange(change: MatButtonToggleChange): void
// {
//     // Set the filter
//     this.selectedFilter = change.value;

//     // Filter the cards
//     this._filterCards();
// }


    /**
     * Filter the cards based on the selected filter
     *
     * @private
     */
    //  private _filterCards(): void
    //  {
    //      // Go through all fuse-cards
    //      this._fuseCards.forEach((fuseCard) => {

    //          // If the 'all' filter is selected...
    //          if ( this.selectedFilter === 'all' )
    //          {
    //              // Remove hidden class from all cards
    //              fuseCard.nativeElement.classList.remove('hidden');
    //          }
    //          // Otherwise...
    //          else
    //          {
    //              // If the card has the class name that matches the selected filter...
    //              if ( fuseCard.nativeElement.classList.contains('filter-' + this.selectedFilter) )
    //              {
    //                  // Remove the hidden class
    //                  fuseCard.nativeElement.classList.remove('hidden');
    //              }
    //              // Otherwise
    //              else
    //              {
    //                  // Add the hidden class
    //                  fuseCard.nativeElement.classList.add('hidden');
    //              }
    //          }
    //      });
    //  }

}
