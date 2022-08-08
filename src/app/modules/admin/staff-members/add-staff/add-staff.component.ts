/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractRestService } from '../../tools/_helper/_gen_crudapi';
import { Staff_Member } from '../../tools/models/staff_member';
import { StaffMemberService } from '../../tools/_services/staff-member.service';
import { authorities } from '@helpers/helper_data';
const _authorities = authorities
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
    formFieldHelpers: string[] = [''];

    isEdit: boolean;
    staffForm: FormGroup;
    submitted: boolean;
    header: string = 'Add Staff';
    staff: Staff_Member;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    date =  new Date()

  constructor(private _formBuilder: FormBuilder,
    private staffService: StaffMemberService,
    private administratorService: StaffMemberService,
    private _matDialogRef: MatDialogRef<AddStaffComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { staff: Staff_Member }
    ) { }

  ngOnInit(): void {

    if (this._data.staff.id) {
        // Request the data from the server
        this.formInit(true);
        this.header = 'Edit staff';
        this.isEdit = true;

        // Get the note
    } else {
        this.formInit(false);
    }
  }

  public formInit(isEdit: boolean, id?: string): void {
    if (!isEdit) {
        //fprm initialize with validations
        this.staffForm = this._formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            RoleDescription: ['', Validators.required],
            contact_Number: ['', Validators.required],
            email_address: ['', Validators.required],
            postal_Address: ['', Validators.required],
            employment_Date: [new Date().toISOString().slice(0, 10), Validators.required],
            qualification: ['', Validators.required],
        });
    } else {
        const staff = this._data.staff;
        // conso
        this.staffForm = this._formBuilder.group({

            name: [staff.name, Validators.required],
            surname: [staff.surname, Validators.required],
            contact_Number: [staff.contact_Number, Validators.required],
            email_address: [staff.email_Address, Validators.required],
            postal_Address: [staff.postal_Address, Validators.required],
            RoleDescription: [staff.RoleDescription, Validators.required],
            employment_Date: [   new Date(staff.employment_Date).toISOString().slice(0, 10), Validators.required],
            qualification: [staff.qualification, Validators.required],
        });
    }
}


      // convenience getter for easy access to form fields
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    get f() {
        return this.staffForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.staffForm.invalid) {
            return;
        } else {
            if (this.isEdit) {
                 const staff = {
                    id: this._data.staff.id,
                    name: this.staffForm.value.name,
                    surname: this.staffForm.value.surname,
                    contact_Number: this.staffForm.value.contact_Number,
                    email_Address: this.staffForm.value.email_address,
                    postal_Address:this.staffForm.value.postal_Address,
                    employment_Date: this.staffForm.value.employment_Date,
                    qualification: this.staffForm.value.qualification,
                    RoleDescription: this.staffForm.value.RoleDescription,

                };
              this.staffService.update(this._data.staff.id, staff).then( () => {
                this.closeDialog(true);
              });
            } else {

                //changefrom any to class
                const staff: Staff_Member = {
                    staff_Type_ID: 2,
                    name: this.staffForm.value.name,
                    surname: this.staffForm.value.surname,
                    contact_Number: this.staffForm.value.contact_Number,
                    email_Address: this.staffForm.value.email_address,
                    postal_Address:this.staffForm.value.postal_Address,
                    employment_Date: this.staffForm.value.employment_Date,
                    qualification: this.staffForm.value.qualification,
                    RoleDescription: this.staffForm.value.RoleDescription,
                    userAuth: [_authorities[0]]


                };
                this.administratorService
                .createUser(staff.email_Address, 'staff01')
                .then((result) => {
                    result.user.updateProfile({
                        displayName: staff.name,

                    })
                    staff.uid = result.user.uid;
                    this.staffService.addwithId(staff, staff.uid  );
                })
                .then(
                    (data) => {
                        this.closeDialog(true);
                    },
                    (error) => {}
                )
                .catch((error) => {});    
            }
        }
    }

    closeDialog(takeAction): void {
        this._matDialogRef.close({ action: takeAction });
    }


/**
 * Get the form field helpers as string
 */
    getFormFieldHelpersAsString(): string
    {
        return this.formFieldHelpers.join(' ');
    }


}
