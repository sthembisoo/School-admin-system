import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product_type } from '../models/product';
import { AbstractRestService } from '../_helper/_gen_crudapi';

@Injectable({
  providedIn: 'root'
})
export class ProductTypesService  extends AbstractRestService<Product_type> {
  constructor( public afs: AngularFirestore,  public afAuth: AngularFireAuth) {

      super('ProductType',afs,'StaffTypes');
  }

 

}
