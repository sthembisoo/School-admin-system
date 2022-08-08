/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'app/modules/admin/tools/_services/product.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {

    message: string;
    Show: boolean = false;
    hide: boolean = true;
    Quantity: string;
  constructor(
    private Productservice: ProductService,
    private _matDialogRef: MatDialogRef<ListComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { event: any },

  ) {
    
   }

  ngOnInit(): void {

    const temp =  Number(this._data.event.Quantity) - Number(this._data.event.Qty);
   



    this.message = "How many " + this._data.event.event.Name + " do you want to buy?"


  }

  Agree()
{

 

  let diff = this._data.event.event.Quantity - Number(this.Quantity);

  if( diff >= 0)
  {
   

    this._data.event.event.Quantity = diff;
    this.Productservice.update(this._data.event.event.Id,this._data.event.event);
    this._matDialogRef.close({action: true});
  }
  else
  {
    this.Show = true;
    this.hide = false;
  }

    
}

}
