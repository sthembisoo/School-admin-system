import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffMemberService } from '@services/staff-member.service';
import { Product } from '../../tools/models/product';
import { ProductService } from '../../tools/_services/product.service';
import { AddProductsComponent } from '../add-products/add-products.component';

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.component.html',
  styleUrls: ['./write-off.component.scss']
})
export class WriteOffComponent implements OnInit {

  formFieldHelpers: string[] = [''];

  isEdit: boolean;
  ProductForm: FormGroup;
  submitted: boolean;
  IsGreater: boolean = false;
  header: string = 'Add Product';
  producttype_data: any[];
  selectedProType: any;
  userName: string;

  constructor(private _formBuilder: FormBuilder,
    private ProductService: ProductService,
    private staffservice: StaffMemberService,
    private _matDialogRef: MatDialogRef<AddProductsComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { Product: Product }
    ) {
    }
  ngOnInit(): void {

    if (this._data.Product.Id) {
      // Request the data from the server
      this.formInit();
      this.header = 'Write-Off';
      this.isEdit = true;
  }

  this.staffservice.getListFiltered('uid', sessionStorage.getItem('uid'))
  .subscribe((response)=>{
         response.length !== 0 ? 
         response.forEach((a) =>{
          console.log('adminy',a.payload.doc.data())
          this.userName = a.payload.doc.data().name
         })
         : this.userName = 'Main Admin' ;
  })


}

  public formInit(): void {
    const product = this._data.Product;
    // conso
    this.ProductForm = this._formBuilder.group({

        reason: ['', Validators.required],
        date: ['', Validators.required],
        quantity: ['', Validators.required],
        name: [{value: this._data.Product.Name, disabled: true}, Validators.required],
        type: [{value: this._data.Product.Type, disabled: true}, Validators.required],
        prev_quantity: [{value: this._data.Product.Quantity,disabled: true}, Validators.required],

    });

  }

  get f() {
    return this.ProductForm.controls;
}

onSubmit(): void {
  this.submitted = true;

   // stop here if form is invalid
   if (this.ProductForm.invalid) {
    return;
} else {

  const tempQuantity = Number(this._data.Product.Quantity) - Number(this.ProductForm.value.quantity)
  if(tempQuantity > 0)
  {
  const Product = {
    name: this._data.Product.Name,
    Product_type: this._data.Product.Type,
    reason: this.ProductForm.value.reason,
    date: this.ProductForm.value.date,
    quantity: this.ProductForm.value.quantity,
    username: this.userName,

};
this._data.Product.Quantity = tempQuantity;
console.log('this is tempquantity', tempQuantity)
this.ProductService.AddWriteOff( Product).then( () => {
  this.ProductService.update(this._data.Product.Id,this._data.Product);
this.closeDialog(true);
});
}
else{
  this.IsGreater = true

}

}

}

closeDialog(takeAction): void {
  this._matDialogRef.close({ action: takeAction });
}

}
