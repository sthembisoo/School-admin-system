/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '@models/Event';
import { EventType } from '@models/eventType';
import { EventsService } from 'app/modules/admin/tools/_services/events.service';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
    formFieldHelpers: string[] = [''];
    eventTypes: EventType[] = [];
    isEdit: boolean;
    eventForm: FormGroup;
    submitted: boolean;
    header: string = 'Add Event';

    event: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private eventService: EventsService,
        private _matDialogRef: MatDialogRef<AddEventComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: { event: any }
    ) {
        this.getEventTypes();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ngOnInit() {
        if (this._data.event.id) {
            // Request the data from the server
            this.formInit(true);
            this.header = 'Edit Event';
            this.isEdit = true;

            // Get the note
        } else {
           
            this.formInit(false);
        }
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    public formInit(isEdit: boolean, id?: string): void {
        if (!isEdit) {
            //fprm initialize with validations
            this.eventForm = this._formBuilder.group({
                eventDescription: ['', Validators.required],
                eventDate: ['', Validators.required],
                eventLocation: ['', Validators.required],
                eventTime: ['', Validators.required],
                eventType: ['', Validators.required],
                eventCost: ['', Validators.required],
            });
        } else {
            const event = this._data.event;
            // conso
            this.eventForm = this._formBuilder.group({
                eventDescription: [event.Description, Validators.required],
                eventDate: [
                    new Date(event.Date).toISOString().slice(0, 10),
                    Validators.required,
                ],
                eventLocation: [event.Location, Validators.required],
                eventTime: [event.Time, Validators.required],
                eventType: [event.Event_Type_ID, Validators.required],
                eventCost: [event.Event_Cost, Validators.required],
            });
        }
    }

    // convenience getter for easy access to form fields
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    get f() {
        return this.eventForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.eventForm.invalid) {
            return;
        } else {
            if (this.isEdit) {
                            // eslint-disable-next-line prefer-const
                 const event = {
                    Event_ID: this._data.event.id,
                    Description: this.eventForm.value.eventDescription,
                    Date: this.eventForm.value.eventDate,
                    Time: this.eventForm.value.eventTime,
                    Location: this.eventForm.value.eventLocation,
                    Event_Type_ID: this.eventForm.value.eventType,
                    Event_Cost: this.eventForm.value.eventCost,
                    Schedule_ID: 1,
                };
              this.eventService.update(this._data.event.id, event).then( () => {
                this.closeDialog(true);
              });
            } else {
                const event: Event = {
                    Description: this.eventForm.value.eventDescription,
                    Date: this.eventForm.value.eventDate,
                    Time: this.eventForm.value.eventTime,
                    Location: this.eventForm.value.eventLocation,
                    Event_Type_ID: this.eventForm.value.eventType,
                    Event_Cost: this.eventForm.value.eventCost,
                    Schedule_ID: 1,
                };
                this.eventService.add(event).then(
                    (data) => {
                        this.closeDialog(true);
                    },
                    (error) => {
                       
                    }
                ).catch((error) => {
                   
                });
            }
        }
    }

    /**
     * Get the form field helpers as string
     */
    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }

    /**
     * get event types as eventTye[]
     */
    async getEventTypes(): Promise<void> {
        const snapshot = await this.eventService.getTypes().then((data: any) => {
            // this.eventTypes = [...data.docs];

            data.docs.forEach((type) => {
                this.eventTypes.push({ ...type.data(), id: type.id });
              });

           
        });
    }

    closeDialog(takeAction): void {
        this._matDialogRef.close({ action: takeAction });
    }
}
