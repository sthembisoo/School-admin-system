/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventsService } from 'app/modules/admin/tools/_services/events.service';

@Component({
    selector: 'app-add-Income',
    templateUrl: './add-Income.component.html',
    styleUrls: ['./add-Income.component.scss'],
})
export class AddIncomeComponent implements OnInit {
    formFieldHelpers: string[] = [''];
    eventIncomeForm: FormGroup;
    submitted: boolean;
    constructor(
        private _formBuilder: FormBuilder,
        private _matDialogRef: MatDialogRef<AddIncomeComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: { event: any },
        private eventService: EventsService
    ) {}

    ngOnInit(): void {
       
        this.formInit(this._data.event);
    }

    onSubmit(): void {
        this.submitted = true;
       
        if (this.eventIncomeForm.valid) {
            const data = this._data.event.event;
            const IncomeForm = {
                Event_ID: data.id,
                Amount: this.eventIncomeForm.value.amount,
                Description: data.Description,
            };
            this.eventService.updateIncome(IncomeForm.Event_ID,IncomeForm, 'Income').then(
                (res) => {
                    this.closeDialog(true);
                },
                (error) => {
                   
                }
            );
        } else {
        }
    }

    formInit(event): void {
        const data = event.event;
        this.eventIncomeForm = this._formBuilder.group({
            eventId: [data.eventID],
            amount: [data.Income, Validators.required],
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    get f() {
        return this.eventIncomeForm.controls;
    }

    closeDialog(takeAction): void {
        this._matDialogRef.close({ action: takeAction });
    }
}
