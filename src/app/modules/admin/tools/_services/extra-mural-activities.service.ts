import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Extra_Mural_Activity } from '../models/extraMuralActivity';
import { AbstractRestService } from '../_helper/_gen_crudapi';

const baseUrl = environment.baseUrl + 'ExtraMuralActivity/';

@Injectable({
    providedIn: 'root',
})
export class ExtraMuralActivitiesService extends AbstractRestService<Extra_Mural_Activity> {
    constructor(private _httpClient: HttpClient, public afs: AngularFirestore) {

        super('extraMuralActivities',afs,'extraMuralActivityTypes');
    }
}
