/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot, DocumentReference } from 'firebase/firestore';
import { AbstractRestService } from '../_helper/_gen_crudapi';
import { Event } from '@models/event';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const baseUrl = environment.baseUrl + 'Events';
@Injectable({
  providedIn: 'root'
})
export class EventsService  extends AbstractRestService<Event>  {

  // eslint-disable-next-line @typescript-eslint/member-ordering
  // eslint-disable-next-line @typescript-eslint/naming-convention

constructor(private _httpClient: HttpClient, public afs: AngularFirestore) {

  super('events',afs,'eventsTypes');

}
  //capture event income
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async updateIncome(docId: string, data: any, innerID: string){
    return this.updateInnerData(docId,data,'EventInformation',innerID);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getEventInformation(docId) {
    return this.afs.doc(`${this.collectionName}/${docId}/EventInformation/Income`).snapshotChanges();
  }


}
