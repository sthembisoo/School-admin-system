import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Pupil_Type } from '../models/pupilType';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractRestService } from '../_helper/_gen_crudapi';
import { collection, DocumentData, getDocs, QuerySnapshot } from 'firebase/firestore';

const baseUrl = environment.baseUrl + 'Pupil/';
@Injectable({
  providedIn: 'root'
})
export class PupilService extends AbstractRestService<any> {

  private _pupil: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _pupils: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient, public afs: AngularFirestore) {

      super('Pupil',afs,'PupilTypes');
  }
  //add pupils to activities
  addPupilsToActivity(pupilIds: string[], activityId: string): Observable<any> {
    //foreach on pupil ids
    pupilIds.forEach((pupilId) => {
      //add pupil to activity
      this.addToArrayOfDocument(pupilId,activityId, 'activities').catch((err) => {
       
      });
    });
    return of(pupilIds);
  }

    //add pupils to activities
    unAssignPupilsToActivity(pupilId, activityId: string): Observable<any> {
      this.removeOnArrayOfDocument(pupilId,activityId, 'activities').catch((err) => {
       
      }
      );
      return of(pupilId);
    }

  //getStudentsInType
  getStudentsInType(typeId: number): Observable<any> {
    return this._httpClient.get(baseUrl + 'getStudentsInType/' + typeId);
  }


  //get Pupil type
  getPupilTypes(): Observable<Pupil_Type> {
    return this._httpClient.get<Pupil_Type>(baseUrl + 'getPupilTypes');
  }

  //get Parent type
  async getParentTypes(): Promise<QuerySnapshot<DocumentData>> {
    const colParentType = collection(this.db, 'ParentTypes');
    const snapshot = await getDocs(colParentType);
    return snapshot;
}


  //get
  getGender(): Observable<any> {
    return this._httpClient.get(baseUrl + 'getGender');
  }



  // grades

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getListOfStudentsInGrade(gradeId: string)
  {
   return this.getListFiltered('Grade', gradeId)
    .subscribe((response) => {
      // let learners = [];
      this._pupils.next(response.map((a) => {
            const data = a.payload.doc.data();
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const id = a.payload.doc.id;
            const type = a.type;
            return { id, type, ...data };
        }));
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getLearnerInGrade(learnerId: string)
  {
    return this.getDocument(learnerId).then((response) => {
      this._pupil.next(response);
    }
    ).catch((err) => {
     
    }
    );
  }

    /**
     * Getter for items
     */
     get pupils$(): Observable<any>
     {
         return this._pupils.asObservable();
     }

     /**
      * Getter for item
      */
     get pupil$(): Observable<any>
     {
         return this._pupil.asObservable();
     }


}
