/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../_helper/_gen_crudapi';
import { Product } from '../models/product';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage, AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { addDoc, collection, CollectionReference, DocumentData, getDocs, getFirestore } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractRestService<Product> {

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    pictureURL: string;
    products: any[];
    cartProducts: any[] = [];
    sales: any;
    cartQuantity: number = 0;
    columndata: CollectionReference<DocumentData>;


  constructor(private _httpClient: HttpClient, public afs: AngularFirestore,
     private afStorage: AngularFireStorage) {

    super('Products',afs,'Product-Types');

    this.columndata = collection(getFirestore(), 'Write-off');
   }


   upload(file,id)
   {

    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(file[0]);

   }

   AddWriteOff(data)
   {
    this.columndata = collection(getFirestore(), 'Write-off');
      return  addDoc(this.columndata, data);
  }


  async getWriteOff()
  {
    this.columndata = collection(getFirestore(), 'Write-off');
    const snapshot = await getDocs(this.columndata);
    return snapshot
  }

  AddStockTake(data)
  {
    this.columndata = collection(getFirestore(), 'Stock-take');
     return  addDoc(this.columndata, data);
 }


 async getStockTake()
 {
  this.columndata = collection(getFirestore(), 'Stock-take');
   const snapshot = await getDocs(this.columndata);
   return snapshot
 }

 AddSale(data)
 {
    this.columndata = collection(getFirestore(), 'Sales');
    return addDoc(this.columndata, data);
 }

 getSale()
 {
    this.columndata = collection(getFirestore(), 'Sales');
    const snapshot = getDocs(this.columndata);
    return snapshot;
 }

   }



