import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractRestService } from '@helpers/_gen_crudapi';
import { Fees } from '@models/fees.model';

@Injectable({
    providedIn: 'root',
})
export class FeesService extends AbstractRestService<Fees> {
    constructor(private _httpClient: HttpClient, public afs: AngularFirestore) {
        super('Fees', afs, 'FeeType');
    }

    //get fees depedning on gradeID and Payment type

    async getFeesApplicable(GradeId: string, PaymentType: string) {
        let paymentInfo;
        paymentInfo = await this.getListFilteredTwo('GradeId', GradeId).then(
            async (res) => {
                return (paymentInfo = res);
            }
        );

        return paymentInfo;
    }
}
