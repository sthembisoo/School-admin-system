import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Injectable({
    providedIn: 'root',
})
export class ConfirmationUtilService {
    configFormRemove: FormGroup;

    configFormAdd: FormGroup;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        // Build the config form
        this.configFormRemove = this._formBuilder.group({
            title: 'Remove data',
            message:
                'Are you sure you want to remove this data permanently? <span class="font-medium">This action cannot be undone!</span>',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Remove',
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'Cancel',
                }),
            }),
            dismissible: true,
        });

        this.configFormAdd = this._formBuilder.group({
            title: 'Save Data',
            message: 'Are you sure you want to save this data?',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'primary',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Save',
                    color: 'primary',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'Cancel',
                }),
            }),
            dismissible: true,
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open confirmation dialog
     */
     openConfirmationDialog(id): any {
        let dialogRef: any;
        // Open the dialog and save the reference of it
        if (id === 1) {
            dialogRef = this._fuseConfirmationService.open(
                this.configFormRemove.value
            );
        } else if (id === 2) {
            dialogRef = this._fuseConfirmationService.open(
                this.configFormAdd.value
            );
        }
        return dialogRef.afterClosed();
    }
}
