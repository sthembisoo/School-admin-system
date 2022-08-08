/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Staff_Member } from '../models/staff_member';
import { AbstractRestService } from '../_helper/_gen_crudapi';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, CollectionReference, doc, DocumentData, Firestore, getDocs, getFirestore, updateDoc } from 'firebase/firestore';

@Injectable({
    providedIn: 'root',
})
export class StaffMemberService extends AbstractRestService<Staff_Member> {

    db: Firestore;
    columndata: CollectionReference<DocumentData>;
    constructor(
        private _httpClient: HttpClient,
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,

    ) {
        super('Staff', afs, 'StaffTypes');
    }

    createUser(email: string, password: string) {
        return this.afAuth.createUserWithEmailAndPassword(email, password);
    }



    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getTeacherds() {
        return this.getListFilteredTwo('staff_Type_ID', 2).then((response) => {
            let classes = [];
            console.log(response);
            classes = response.subscribe((arg) => console.log(arg));

            console.log(classes);
            return classes;
        });
    }


   async updateAdminStaff(data)
   {
    const docRef = doc(this.db, 'Staff', data.id);
    await updateDoc(docRef, { ...data });

    // this.columndata = collection(getFirestore(), 'Write-off');
    //   return  addDoc(this.columndata, data);
  }

    getTeachers(): any[] {
        let data = [];

        this.getList()
            .then((response) => {
                response.docs.forEach((type) => {
                    if (type.data().staff_Type_ID === 2) {
                        data.push({ ...type.data(), id: type.id });
                    }
                });
                console.log(data);
            })
            .catch((error) => {});

        return data;
    }

    AddLearnerToAbsent(data:any) {
      return this.addToSpecificCollection(data, "absentLearners")
    }


    getAbsentLearners()
    {
       this.columndata = collection(getFirestore(), 'absentLearners');
       const snapshot = getDocs(this.columndata);
       return snapshot;
    }
}
