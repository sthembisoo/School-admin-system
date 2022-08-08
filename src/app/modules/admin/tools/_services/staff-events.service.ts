import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractRestService } from '@helpers/_gen_crudapi';
import { CalendarEvent } from 'app/shared/calendar/calendar.types';
import { addDoc, DocumentReference } from 'firebase/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StaffEventsService extends AbstractRestService<Event> {
    // eslint-disable-next-line @typescript-eslint/member-ordering
    // eslint-disable-next-line @typescript-eslint/naming-convention

    constructor(private _httpClient: HttpClient, public afs: AngularFirestore) {
        super('Staff-events', afs, 'eventsTypes');
    }

     addStaffEvent(data: any): Observable<CalendarEvent> {
        let event: CalendarEvent;
          addDoc(this.Col, data).then((_event:any)=>{
            event = {..._event}
          });
    return of(event)
  }

}
