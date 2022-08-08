import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractRestService } from '@helpers/_gen_crudapi';
import { Fees } from '@models/fees.model';
import { BehaviorSubject, of } from 'rxjs';
import { FeesModule } from '../../fees/fee.module';

@Injectable({
    providedIn: 'root',
})
export class PupilFeesService extends AbstractRestService<Fees> {
  private _fee: BehaviorSubject<Fees | null> = new BehaviorSubject(null);

    constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
        super('Pupil-fees', afs, 'NotiInUse');
    }

  async  getLearnerFees(learnerId: string) {
        let Fees: FeesModule;
        this.getDocument(learnerId)
            .then((response: Fees) => {
               this._fee.next(response) ;
            })
            .catch((err) => {
                console.error(err);
            });
        return  await this._fee;
    }

    AddStudentFee(learnerId: string, fee: Fees) {
        return this.addwithId(fee, learnerId)
            .then((response) => {})
            .catch((err) => console.error(err));
    }
}
