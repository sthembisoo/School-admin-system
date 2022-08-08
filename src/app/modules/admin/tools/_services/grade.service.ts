import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractRestService } from '../_helper/_gen_crudapi';

@Injectable({
  providedIn: 'root'
})
export class GradeService  extends AbstractRestService<any> {
  constructor(private _httpClient: HttpClient, public afs: AngularFirestore) {

      super('Grades',afs,'gradeType');
  }

}


@Injectable({
  providedIn: 'root'
})
export class ClassService  extends AbstractRestService<any> {
  constructor(private _httpClient: HttpClient, public afs: AngularFirestore) {

      super('Classes',afs,'classType');
  }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getListofClassesInAGrade(gradeId: string)
    {
     return this.getListFilteredTwo('GradeId', gradeId)
      .then((response) => {
         let classes = [];
         classes = response.map((a) => {
              const data = a.payload.doc.data();
              // eslint-disable-next-line @typescript-eslint/no-shadow
              const id = a.payload.doc.id;
              const type = a.type;
              return { id, type, ...data };
          });
      
    })
  }

}
