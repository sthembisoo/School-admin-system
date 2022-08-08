/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    DocumentData,
    DocumentReference,
    Firestore,
    getDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    QuerySnapshot,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { Subject } from 'rxjs';

export abstract class AbstractRestService<T> {
    db: Firestore;
    Col: CollectionReference<DocumentData>;
    ColType: CollectionReference<DocumentData>;
    Collection: AngularFirestoreCollection<T>;
    private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
    obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();

    constructor(
        protected collectionName: string,
        protected afs: AngularFirestore,
        protected typeDb?: string
    ) {
        this.db = getFirestore();
        this.Col = collection(this.db, collectionName);

        if (typeDb) {
            this.ColType = collection(this.db, typeDb);
            //get realtime data
            this.getRealtimeData(this.ColType);
        }

        // Get Realtime Data
        this.getRealtimeData(this.Col);
    }

    getRealtimeData(Col): void {
        onSnapshot(
            Col,
            (snapshot) => {
                this.updatedSnapshot.next(snapshot);
            },
            (err) => {
               
            }
        );
    }

    //get a list of documents
    async getList(): Promise<QuerySnapshot<DocumentData>> {
        const snapshot = await getDocs(this.Col);
        return snapshot;
    }

    //get documents  filter
    //https://cloud.google.com/firestore/docs/query-data/queries
    getListFiltered(filterName, filter) {
        const snapshot: any = this.afs
            .collection(this.collectionName, ref =>
                ref.where(`${filterName}`, '==', filter)
            )
            .snapshotChanges();
        return snapshot;
    }

       async getListFilteredTwo(filterName, filter) {
        const snapshot: any = this.afs
            .collection(this.collectionName, ref =>
                ref.where(`${filterName}`, '==', filter)
            )
            .snapshotChanges();
        return snapshot;
    }

        getListFilteredWithCondition(filterArrayName,filterQuery, filter) {
            const snapshot: any = this.afs
                .collection(this.collectionName, ref =>
                    ref.where(`${filterArrayName}`,filterQuery, filter)
                )
                .snapshotChanges();
            return snapshot;
        }


    /***
     * *Add to the collection 
     */
    async add(data: T): Promise<DocumentReference<any>> {
        return await addDoc(this.Col, data);
    }

    /***
     * *Add to the collection using custom Id
     */
    async addwithId(data: T, id: string) {
        return this.afs.collection(this.collectionName).doc(id).set(data)
    }

        /***
     * * Add to the specific collection
     * !specify collection
     */
         async addToSpecificCollection(data: any, collection: string) {
            return this.afs.collection(collection).add({...data})
        }
    

     /***
     * *get types
     */
    async getTypes(): Promise<QuerySnapshot<DocumentData>> {
        const snapshot = await getDocs(this.ColType);
        return snapshot;
    }

    // get document by id
    async getDocument(id: string) {
        const docRef = doc(this.db, this.collectionName, id);
        const docSnap = await getDoc(docRef);
        const info = docSnap.data();
        return info;
    }


    async delete(docId: string) {
        const docRef = doc(this.db, this.collectionName, docId);
        await deleteDoc(docRef);
        return;
    }

    async update(docId: string, data: any) {
        const docRef = doc(this.db, this.collectionName, docId);
        await updateDoc(docRef, { ...data });

        // this.afs.doc(`options/${id}`).update({rating:$rating})
        return;
    }

    //add to array of documents
    async addToArrayOfDocument(docId: string, data: any, arrayName) {
        const docRef = doc(this.db, this.collectionName, docId);
        await updateDoc(docRef, {
            [arrayName]: arrayUnion(data)
        });
    }

        //add to array of documents
    async removeOnArrayOfDocument(docId: string, data: any, arrayName) {
        const docRef = doc(this.db, this.collectionName, docId);
        await updateDoc(docRef, {
            [arrayName]: arrayRemove(data)
        });
    }

    //capture event income
    async updateInnerData(
        docId: string,
        data: any,
        innerCollection: string,
        innerID?: string
    ) {
        const snapshot: any = this.afs.firestore
            .collection(this.collectionName)
            .doc(docId)
            .collection(innerCollection)
            .doc(innerID)
            .set(data);
        return snapshot;
    }

    //Add set document
    async addSetToDocument(docId: any,data) {
        const frankDocRef = doc(this.db,  this.collectionName, docId);
        await setDoc(frankDocRef, {
            ...data
        });
    }
}
