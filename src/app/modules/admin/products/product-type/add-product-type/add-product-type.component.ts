import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product_type } from 'app/modules/admin/tools/models/product';
import { ProductTypesService } from 'app/modules/admin/tools/_services/product-types.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.scss']
})
export class AddProductTypeComponent implements OnInit {

  formFieldHelpers: string[] = [''];

    isEdit: boolean;
    ProductForm: FormGroup;
    submitted: boolean;
    header: string = 'Add Product Type';

    private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _formBuilder: FormBuilder,
    private ProductService: ProductTypesService,
    private _matDialogRef: MatDialogRef<AddProductTypeComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { Producttype: Product_type }
    ) {
    }

  ngOnInit(): void {

   
    if (this._data.Producttype) {
        // Request the data from the server
        this.formInit(true);
        this.header = 'Edit Product type';
        this.isEdit = true;

        // Get the note
    } else {

        this.formInit(false);
    }
  }

  public formInit(isEdit: boolean, id?: string): void {
    if (!isEdit) {
        //fprm initialize with validations
        this.ProductForm = this._formBuilder.group({
          name: ['', Validators.required],
 
        });
    } else {
 
 
     
        const product = this._data.Producttype;
        // conso
        this.ProductForm = this._formBuilder.group({

            name: [product.name, Validators.required],

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
                 const Product_type = {
                    name: this.ProductForm.value.name,
         
                };
              this.ProductService.update(this._data.Producttype.id, Product_type).then( () => {
                this.closeDialog(true);
              });
            } else {

                //changefrom any to class
                const Product_type: any = {
                  name: this.ProductForm.value.name,
                };
               
                this.ProductService.add(Product_type).then((li)=>{
                  this.closeDialog(true);
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



}
