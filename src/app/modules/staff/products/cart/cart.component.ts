import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import jsPDF from 'jspdf';

import { DatePipe, Location } from '@angular/common';
import { ProductService } from '@services/product.service';
import { object } from 'firebase-functions/v1/storage';
import { PupilService } from '@services/pupil.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { Router } from '@angular/router';
import { ToastService } from 'app/modules/admin/tools/_toast/toast.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    products: any[] = [];
    show: boolean = false;
    Total: number = 0;
    parents: any[];
    paymentType: string[] = ['Cash', 'Eft', 'Speedpoint', 'Credit'];
    checkoutForm: FormGroup;
    cartCount: number = 0;

    alert: {type: FuseAlertType; message: string} = {
        type: 'success',
        message: 'Purchased Succesfully'
    }
    showAlert: boolean = false;
    errorCount: boolean = false;

  constructor(
    private location: Location,
    private productservice: ProductService,
    private pupilService: PupilService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private toastr: ToastService,
    
  ) { }

  ngOnInit(): void {

    console.log('this is mine', this.productservice.cartProducts)

   // this.ListComponent.matDrawer.open();
   this.productservice.cartProducts.forEach((x)=>
   {
   const exist =  this.products.find((element) =>{
    return element.Id === x.Id;
   })

   if(exist !== undefined)
   {

   }
   else{
    x.count = 1;
    this.products.push(Object.assign({}, x));
    this.Total += x.Cost
    this.show = true;
   }
   });

   this.pupilService.getList().then((response) =>{
    this.parents = [];
    response.docs.forEach((p) =>
    {
        this.parents.push((p.data().parent[0].Name + ' ' + p.data().parent[0].Surname));
    });
});

    this.checkoutForm = this._formBuilder.group({
        payment_type: ['', Validators.required],
        parent: ['', Validators.required],
       // count: [this.products, Validators.required],
    })



  }

  checkout()
  {
    
    

    let mydate = new Date()
    const Sale: any = {
        date: this.datePipe.transform(mydate,'yyyy-MM-dd'),
        parent: this.checkoutForm.value.parent,
        payment_type: this.checkoutForm.value.payment_type,
        amount: this.Total,
        products: this.products
    };
    this.productservice.AddSale(Sale).then(x =>{
      this.products.forEach(x =>
        {
            let q = Number(x.Quantity) - Number(x.count);
            this.productservice.update(x.Id,{Quantity: q})
        })
        this.productservice.cartProducts = [];
        this.showAlert = true
        setTimeout(() =>{
            this.router.navigateByUrl('staff-Products/staff-pro')
    }, 4000)
    })
    this.productservice.cartQuantity = 0
  
  }

  onChange( pro, products)
  {

    console.log('onchange',pro, products)

    this.Total = 0;
    products.forEach((x) =>{
      console.log('total',this.Total)
        this.Total += (x.Cost * x.count);
    })

    if(pro.Quantity < pro.count)
    {
        this.alert.type = 'error';
        this.alert.message = 'Quantity selected is more than quantity avalable';
        // this.showAlert = true;
        this.errorCount = true
        this.toastr.showError(this.alert.message)
        setTimeout(() =>{
           
        }, 8000)
    }
    else{
      this.errorCount = false;
      this.showAlert = false;
 
    }

  }

     /**
     * Close the drawer
     */
    //   closeDrawer(): Promise<MatDrawerToggleResult> {
    //     return this.ListComponent.matDrawer.close();
    // }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */

     back(): void {
      this.location.back();
    }

     trackByFn(index: number, item: any): any {
        return item.id || index;
    }


}
