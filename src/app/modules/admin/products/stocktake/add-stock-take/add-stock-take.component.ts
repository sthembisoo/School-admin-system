import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'app/modules/admin/tools/models/product';
import { ProductTypesService } from 'app/modules/admin/tools/_services/product-types.service';
import { ProductService } from 'app/modules/admin/tools/_services/product.service';
import { StaffMemberService } from 'app/modules/admin/tools/_services/staff-member.service';
import { stat } from 'fs';
import { type } from 'os';


@Component({
  selector: 'app-add-stock-take',
  templateUrl: './add-stock-take.component.html',
  styleUrls: ['./add-stock-take.component.scss']
})
export class AddStockTakeComponent implements OnInit {

  formFieldHelpers: string[] = [''];

  isEdit: boolean;
  ProductForm: FormGroup;
  submitted: boolean;
  IsGreater: boolean = false;
  header: string = 'Add Product';
  producttype_data: any[];
  Products_data: any[];
  filterd_products: any[];
  staff_data: any[];
  selectedProType: any;
  userName: string;

  constructor(private _formBuilder: FormBuilder,
    private ProductService: ProductService,
    private Producttypeservice: ProductTypesService,
    private staffservice: StaffMemberService,
    private _matDialogRef: MatDialogRef<AddStockTakeComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { Product: Product }
    ) {
    }
  ngOnInit(): void {

      this.formInit();
      this.getAllRequiredData();
      this.getDropdownDatafromSelected();

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
      name: ['', Validators.required],
      Product_type: ['', Validators.required],
      current_quantity: [{value:'', disabled: true}, Validators.required],
      revised_quantity: ['', Validators.required],
      date: ['', Validators.required],


    });

  }

  getAllRequiredData()
  {
      this.ProductService.getList().then((Response) =>
      {
        this.Products_data = [];
        Response.docs.forEach((pro) =>{
          this.Products_data.push({...pro.data()});
        })
      }).then(()=>{
        this.Producttypeservice.getList().then((types)=>{
          this.producttype_data = [];
        types.docs.forEach((pro_type)=>
        {
          this.producttype_data.push({...pro_type.data()})
        })

        // this.staffService.getList().then((staff)=>
        // {
        //   staff.docs.forEach((member)=>
        //   {
        //     this.staff_data = []
        //     if(member.data().staff_Type_ID === 1){
        //       this.staff_data.push({ ...member.data(), id: member.id });
        //       }
        //     });
        //   });
        })
      })
  }

  get f() {
    return this.ProductForm.controls;
}

getDropdownDatafromSelected()
{
    this.ProductForm.get('Product_type').valueChanges.subscribe(selected =>{
       console.log('dropdown', selected);

        this.filterd_products = this.Products_data.filter(pro =>
            pro.Type === selected)

    })
    this.ProductForm.get('name').valueChanges.subscribe(selected =>{
        console.log('dropdown_name', selected);

        this.ProductForm.get('current_quantity').setValue(selected.Quantity)
        //  this.filterd_products = this.Products_data.filter(pro =>
        //      pro.Type === selected)

     })
}

onSubmit(): void {
  this.submitted = true;

   // stop here if form is invalid
   if (this.ProductForm.invalid) {
    console.log('invalid');
    return;
} else {

let Status: string = '';
console.log('invalid' ,this.ProductForm.controls.current_quantity.value, this.ProductForm.value.revised_quantity);
 let tem =  Number(this.ProductForm.controls.current_quantity.value) - Number(this.ProductForm.value.revised_quantity)
 console.log('temp', tem)
    if(Number(this.ProductForm.controls.current_quantity.value) < Number(this.ProductForm.value.revised_quantity))
    {
     Status = 'Increased'
    }
   else if(Number(this.ProductForm.controls.current_quantity.value) > Number(this.ProductForm.value.revised_quantity))
    {
        Status = 'Decreased'
    }
    else{
        Status = 'Equal'
    }


  const Product = {

    name: this.ProductForm.value.name.Name,
    Product_type: this.ProductForm.value.Product_type,
    current_quantity:  this.ProductForm.controls.current_quantity.value,
    revised_quantity:  this.ProductForm.value.revised_quantity,
    Status: Status,
    staffmember:  this.userName,
    date:  this.ProductForm.value.date,
};
console.log('this is stocktake pro', Product)
this.ProductService.AddStockTake( Product).then( () => {
 this.ProductService.update( this.ProductForm.value.name.Id,{Quantity:this.ProductForm.value.revised_quantity });
this.closeDialog(true);
});


}

}

closeDialog(takeAction): void {
  this._matDialogRef.close({ action: takeAction });
}

}
