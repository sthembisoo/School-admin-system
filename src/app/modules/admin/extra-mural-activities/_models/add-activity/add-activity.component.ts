/* eslint-disable @typescript-eslint/naming-convention */

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Extra_Mural_Activity } from 'app/modules/admin/tools/models/ExtraMuralActivity';
import { ExtraMuralActivitiesService } from 'app/modules/admin/tools/_services/extra-mural-activities.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit {

  formFieldHelpers: string[] = [''];
  activityTypes: any[] = [];
  isEdit: boolean;
  activityForm: FormGroup;
  submitted: boolean;
  header: string = 'Add activity';

  activity: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
      private _formBuilder: FormBuilder,
      private activityService: ExtraMuralActivitiesService,
      private _matDialogRef: MatDialogRef<AddActivityComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: { activity: any }
  ) {
      this.getActivityTypes();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ngOnInit() {
      if (this._data.activity) {
          // Request the data from the server
          this.formInit(true);
          this.header = 'Edit Activity';
          this.isEdit = true;

          // Get the note
      } else {
          this.formInit(false);
      }
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  public formInit(isEdit): void {
      if (!isEdit) {
          //fprm initialize with validations
          this.activityForm = this._formBuilder.group({
              activityDescription: ['', Validators.required],
              activityDate: ['', Validators.required],
              activityLocation: ['', Validators.required],
              activityTime: ['', Validators.required],
              activityType: ['', Validators.required]
          });
      } else {
          const activity = this._data.activity;
          this.activityForm = this._formBuilder.group({
              activityDescription: [activity.Activity_Description, Validators.required],
              activityDate: [
                  new Date(activity.Activity_Date).toISOString().slice(0, 10),
                  Validators.required,
              ],
              activityLocation: [activity.Activity_Location, Validators.required],
              activityTime: [activity.Activity_Time, Validators.required],
              activityType: [activity.Activity_Type_ID, Validators.required],
          });
      }
  }

  // convenience getter for easy access to form fields
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get f() {
      return this.activityForm.controls;
  }

  onSubmit(): void {
      this.submitted = true;
     
      // stop here if form is invalid
      if (this.activityForm.invalid) {
          return;
      } else {

          if (this.isEdit) {
            const activity: Extra_Mural_Activity = {
                Extra_Mural_Activity_ID: this._data.activity.id || null,
                Activity_Description: this.activityForm.value.activityDescription,
                Activity_Date: this.activityForm.value.activityDate,
                Activity_Time: this.activityForm.value.activityTime,
                Activity_Location: this.activityForm.value.activityLocation,
                Activity_Type_ID: this.activityForm.value.activityType,
                Schedule_ID: 1,
            };
            this.activityService.update(activity.Extra_Mural_Activity_ID, activity).then( () => {
              this.closeDialog(true);
            });
          } else {
            const activity: Extra_Mural_Activity = {
              Activity_Description: this.activityForm.value.activityDescription,
              Activity_Date: this.activityForm.value.activityDate,
              Activity_Time: this.activityForm.value.activityTime,
              Activity_Location: this.activityForm.value.activityLocation,
              Activity_Type_ID: this.activityForm.value.activityType,
              Schedule_ID: 1,
          };

              this.activityService.add(activity).then(
                  (data) => {
                      this.closeDialog(true);
                  },
                  (error) => {
                     
                  }
              );
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
   * get event types as getActivityTypes[]
   */

  async getActivityTypes(): Promise<void> {
    const snapshot = await this.activityService.getTypes().then((data: any) => {
       
        // this.eventTypes = [...data.docs];

        data.docs.forEach((type) => {
            this.activityTypes.push({ ...type.data(), id: type.id });
          });

    });
}

  closeDialog(takeAction): void {
      this._matDialogRef.close({ action: takeAction });
  }
}
