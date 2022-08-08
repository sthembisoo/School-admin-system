/* eslint-disable id-blacklist */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffMemberService } from '../../tools/_services/staff-member.service';
import { Staff_Member } from '../../tools/models/staff_member';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-add-fee',
  templateUrl: './add-fee.component.html',
  styleUrls: ['./add-fee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFeeComponent implements OnInit {
    formFieldHelpers: string[] = [''];

    isEdit: boolean;
    Fee: any;
    FeeForm: FormGroup;
    submitted: boolean;
    header: string = 'Add Fee';
    kk: string[] = [
       'Approve Registration','Create Staff','something else'
    ];

    staff: Staff_Member;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _formBuilder: FormBuilder,
    private FeeService: StaffMemberService,
    private _matDialogRef: MatDialogRef<AddFeeComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { staff: Staff_Member }
    ) { }

  ngOnInit(): void {
    if (this._data.staff.id) {
        // Request the data from the server
        this.formInit(true);
        this.header = 'Edit Fee';
        this.isEdit = true;

        // Get the note
    } else {
        this.formInit(false);
    }
  }

  public formInit(isEdit: boolean, id?: string): void {
    if (!isEdit) {
        //fprm initialize with validations
        this.FeeForm = this._formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            contact_Number: ['', Validators.required],
            email_address: ['', Validators.required],
            employment_Date: ['', Validators.required],
            qualification: ['', Validators.required],
            userAuth:['',]
        });
    } else {
        const Fee = this._data.staff;
        // conso
        this.FeeForm = this._formBuilder.group({
            name: [Fee.name, Validators.required],
            surname: [Fee.surname, Validators.required],
            contact_Number: [Fee.contact_Number, Validators.required],
            email_address: [Fee.email_Address, Validators.required],
            employment_Date: [   new Date(Fee.employment_Date).toISOString().slice(0, 10), Validators.required],
            qualification: [Fee.qualification, Validators.required],
            userAuth:[Fee.contact_Number,]
        });
    }
}


      // convenience getter for easy access to form fields
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    get f() {
        return this.FeeForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.FeeForm.invalid) {
            return;
        } else {
            if (this.isEdit) {
                            // eslint-disable-next-line prefer-const
                 const Fee: Staff_Member = {
                    id: this._data.staff.id,
                    staff_Type_ID: this._data.staff.staff_Type_ID,
                    name: this.FeeForm.value.name,
                    surname: this.FeeForm.value.surname,
                    contact_Number: this.FeeForm.value.contact_Number,
                    email_Address: this.FeeForm.value.email_address,                    employment_Date: this.FeeForm.value.employment_Date,
                    qualification: this.FeeForm.value.qualification,
                };
              this.FeeService.update(this._data.staff.id, Fee).then( () => {
                this.closeDialog(true);
              });
            } else {
                 this.Fee = {
                    staff_Type_ID: 1,
                    name: this.FeeForm.value.name,
                    surname: this.FeeForm.value.surname,
                    contact_Number: this.FeeForm.value.contact_Number,
                    email_Address: this.FeeForm.value.email_address,                    employment_Date: this.FeeForm.value.employment_Date,
                    qualification: this.FeeForm.value.qualification,
                };
            this.FeeService.createUser(this.Fee.email_Address, 'admin01')
            .then((result) =>{
               
                this.Fee.uid = result.user.uid;
            }).then((y)=>{
           
                this.FeeService.add(this.Fee).then(
                    (data) => {
                        this.closeDialog(true);
                    },
                    (error) => {
                       
                    }
                ).catch((error) => {
                   
                });
            });
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
