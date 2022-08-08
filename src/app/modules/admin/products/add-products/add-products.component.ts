/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Product, Product_type } from '../../tools/models/product';
import { ProductTypesService } from '../../tools/_services/product-types.service';
import { ProductService } from '../../tools/_services/product.service';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductsComponent implements OnInit {
    formFieldHelpers: string[] = [''];

    isEdit: boolean;
    ProductForm: FormGroup;
    submitted: boolean;
    header: string = 'Add Product';
    display: FormControl = new FormControl('', Validators.required);
    producttype_data: any[];
    
    file_store: FileList;
     accept: string = 'image/*';
    selectedProType: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _formBuilder: FormBuilder,
    private ProductService: ProductService,
    private Producttypeservice: ProductTypesService,
    private _matDialogRef: MatDialogRef<AddProductsComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { Product: Product }
    ) {
    }

  ngOnInit(): void {

    this.getAllProductTypes()



    if (this._data.Product.Id) {
        // Request the data from the server
        this.formInit(true);
        this.header = 'Edit Product';
        this.isEdit = true;
        this.selectedProType =  this._data.Product.Type;

        // Get the note
    } else {

        this.formInit(false);
    }
  }

  getAllProductTypes()
  {
    this.Producttypeservice.getList().then((Response)=>{
        this.producttype_data = [];
        Response.docs.forEach((type) =>{
            this.producttype_data.push({...type.data()});
        })
        console.log('this is product type', this.producttype_data);

    })

  }

  public formInit(isEdit: boolean, id?: string): void {
    if (!isEdit) {
        //fprm initialize with validations
        this.ProductForm = this._formBuilder.group({
            name: ['', Validators.required],
            Product_type: ['', Validators.required],
            price: ['', Validators.required],
            quantity: ['', Validators.required],
            filename: ['', Validators.required]
        });
    } else {
        const product = this._data.Product;
        // conso
        this.ProductForm = this._formBuilder.group({

            name: [product.Name, Validators.required],
            Product_type: [product.Type, Validators.required],
            price: [product.Cost, Validators.required],
            quantity: [product.Quantity, Validators.required],
            filename: ['', Validators.required],
        });
    }
}


      // convenience getter for easy access to form fields
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    get f() {
        return this.ProductForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.ProductForm.invalid) {
            return;
        } else {
            if (this.isEdit) {
                 const Product = {
                    name: this.ProductForm.value.name,
                    Product_type: this.ProductForm.value.Product_type,
                    cost: this.ProductForm.value.Cost,
                    quantity: this.ProductForm.value.quantity,
                    filename: this.ProductForm.value.filename,
                };
              this.ProductService.update(this._data.Product.Id, Product).then( () => {
                this.closeDialog(true);
              });
            } else {

                //changefrom any to class
                const Product: Product = {
                    Name: this.ProductForm.value.name,
                    Type: this.ProductForm.value.Product_type,
                    Cost: this.ProductForm.value.price,
                    Quantity: this.ProductForm.value.quantity,
                    Product_Image: this.ProductForm.value.filename,
                    Status:true,
                };

                this.ProductService.add(Product).then(
                    (data) => {

                        this.ProductService.upload(this.file_store, data.id);
                        this.closeDialog(true);
                    },
                    (error) => {

                    }
                ).catch((error) => {

                });
            }
        }
    }

    closeDialog(takeAction): void {
        this._matDialogRef.close({ action: takeAction });
    }


/**
 * Get the form field helpers as string
 */
    getFormFieldHelpersAsString(): string
    {
        return this.formFieldHelpers.join(' ');
    }

    handleFileInputChange(l: FileList): void {

        this.file_store = l;
        if (l.length) {
          const fs = l[0];
          const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
          this.display.patchValue(`${fs.name}${count}`);


        } else {
          this.display.patchValue('');
        }
      }

}
