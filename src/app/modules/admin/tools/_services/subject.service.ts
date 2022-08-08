import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from '../models/subject';
import { AbstractRestService } from '../_helper/_gen_crudapi';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends AbstractRestService<Subject> {

  constructor(private _httpClient: HttpClient, public afs: AngularFirestore) {

    super('Subjects',afs,'StaffTypes');
}
}
