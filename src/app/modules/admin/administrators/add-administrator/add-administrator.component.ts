/* eslint-disable id-blacklist */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/naming-convention */
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffMemberService } from '../../tools/_services/staff-member.service';
import { Staff_Member } from '../../tools/models/staff_member';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
    selector: 'app-add-administrator',
    templateUrl: './add-administrator.component.html',
    styleUrls: ['./add-administrator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAdministratorComponent implements OnInit {
    formFieldHelpers: string[] = [''];

    isEdit: boolean;
    administrator: any;
    administratorForm: FormGroup;
    submitted: boolean;
    header: string = 'Add Administrator';
    staffdata: any[];
    authorities: any[] =    [ {
            id   : 'dashboard',
            title: 'Dashboard',
            type : 'basic',
            icon : 'heroicons_outline:chart-pie',
            link : '/dashboard'
        },
        {
            id   : 'staff',
            title: 'Staff Members',
            type : 'basic',
            icon : 'heroicons_outline:user-group',
            link : '/staff/staff-list'
        },
        {
            id   : 'administrator',
            title: 'Administrators',
            type : 'basic',
            icon : 'heroicons_outline:identification',
            link : '/administrators/administrators-list'
        },
        {
            id   : 'Product',
            title: 'Products',
            type : 'collapsable',
            icon : 'heroicons_outline:cube',
            link : '/Products',
            children: [
                {
                    id   : 'Products',
                    title: 'Products',
                    type : 'basic',
                    link : '/Products/product-list'
                },
                {
                    id   : 'Product-type',
                    title: 'Product type',
                    type : 'basic',
                    link : '/Products/product-type'
                },
                {
                    id   : 'Stock-take',
                    title: 'Stocktake',
                    type : 'basic',
                    link : '/Products/stock-take'
                }
            ]
        },
        {
            id   : 'StaffProduct',
            title: 'Staff Products',
            type : 'basic',
            icon : 'heroicons_outline:cube',
            link : '/staff-Products/staff-pro'
        },
        {
            id   : 'events',
            title: 'Events',
            type : 'collapsable',
            icon : 'heroicons_outline:calendar',
            link : '/events',
            children: [
                {
                    id   : 'user-interface.forms.fields',
                    title: 'Events',
                    type : 'basic',
                    link : '/events/event-list'
                },
                {
                    id   : 'user-interface.forms.fields',
                    title: 'Event Income',
                    type : 'basic',
                    link : '/events/event-income'
                },
            ]
        },
        {
            id   : 'extra-mural-activities',
            title: 'Extra Mural Activities',
            type : 'basic',
            icon : 'heroicons_outline:puzzle',
            link : '/extra-mural-activities'
        },
        {
            id   : 'grades',
            title: 'Grades',
            type : 'basic',
            icon : 'heroicons_outline:identification',
            link : '/grades'
        },
        {
            id   : 'fees',
            title: 'Fees',
            type : 'basic',
            icon : 'heroicons_outline:chart-bar',
            link : '/fees'
        },
        {
            id  : 'divider-2',
            type: 'divider'
        }, {
            id   : 'myclasses',
            title: 'My Classes',
            type : 'basic',
            icon : 'heroicons_outline:chart-bar',
            link : '/myclasses'
        },

        {
            id  : 'divider-2',
            type: 'divider'
        },
        {
            id   : 'pupil',
            title: 'Pupil',
            type : 'collapsable',
            icon : 'heroicons_outline:users',
            link : '/pupil',
            children: [
                {
                    id   : 'pupil.list.register',
                    title: 'Pupil List',
                    type : 'basic',
                    link : '/pupil/pupil-list'
                },
                {
                    id   : 'pupil.activities',
                    title: 'Activities',
                    type : 'basic',
                    link : '/pupil/activities'
                },
            ]
        },
    ];

    displayedAuth: any[] =
    [{
        id   : 'dashboard',
        title: 'Dashboard',
    },
    {
        id   : 'staff',
            title: 'Staff Members',
    },
    {
        id   : 'administrator',
        title: 'Administrators',
    },
    {
        id   : 'Product',
        title: 'Products',
    },
    {
        id   : 'StaffProduct',
            title: 'Staff Products',
    },
    {
        id   : 'events',
        title: 'Events',
    },
    {
        id   : 'extra-mural-activities',
        title: 'Extra Mural Activities',
    },
    {
        id   : 'grades',
        title: 'Grades',
    },
    {
        id   : 'fees',
            title: 'Fees',
    },
    {
        id   : 'myclasses',
        title: 'My Classes',
    },
    {
        id   : 'pupil',
        title: 'Pupil',
    }
]

    staff: Staff_Member;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _formBuilder: FormBuilder,
        private administratorService: StaffMemberService,
        private _matDialogRef: MatDialogRef<AddAdministratorComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: { staff: any }
    ) {}

    ngOnInit(): void {

        this.getAdministrators();
        if (this._data.staff.id) {
            // Request the data from the server
            this.formInit(true);
            this.header = 'Assign Staff';
            this.isEdit = true;

            // Get the note
        } else {
            this.formInit(false);
        }
        console.log('data', this._data.staff)
    }



    public formInit(isEdit: boolean, id?: string): void {
        if (!isEdit) {
            //fprm initialize with validations
            this.administratorForm = this._formBuilder.group({
                name: ['', Validators.required],
                RoleDescription: ['', Validators.required],
                date: ['', Validators.required],
                userAuth: [''],
            });
        } else {
            const administrator = this._data.staff;


            let authoArray: any[] = []
            let tempo =  this._data.staff.userAuth;
            tempo.forEach((x)=>{
                authoArray.push(this.displayedAuth.find((auth)=>{
                        return auth.id === x.id;
                }))
            })
            console.log(authoArray)

            // conso
            this.administratorForm = this._formBuilder.group({
                name: [{value: administrator.name,  disabled: true}, Validators.required],
                RoleDescription: [administrator.RoleDescription, Validators.required],
                date: [
                    new Date(administrator.employment_Date)
                        .toISOString()
                        .slice(0, 10),
                    Validators.required,
                ],
                userAuth: [tempo],
            });
        }
    }

    getAdministrators(): void {
        this.administratorService.getList().then((response) => {
            this.staffdata = [];
            response.docs.forEach((type) => {
                this.staffdata.push({ ...type.data(), id: type.id });
              });
    }).catch((error) => {

    });
    }

    // convenience getter for easy access to form fields
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    get f() {
        return this.administratorForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.administratorForm.invalid) {
            return;
        } else {
            if (this.isEdit) {
                // eslint-disable-next-line prefer-const

                let authArray: any[] = []
                let temp =  this.administratorForm.value.userAuth;
                temp.forEach((x)=>{
                    authArray.push(this.authorities.find((auth)=>{
                            return auth.id === x.id;
                    }))
                })
                const administrator: any = {
                    id: this._data.staff.id,
                    RoleDescription: this.administratorForm.value.RoleDescription,
                    date: this.administratorForm.value.date,
                     userAuth: authArray,
                };
                this.administratorService
                    .update(this._data.staff.id, administrator)
                    .then(() => {
                        this.closeDialog(true);
                    });
            } else {


                this.administrator = {
                    id: this.administratorForm.value.name.id,
                    RoleDescription: this.administratorForm.value.RoleDescription,
                    date: this.administratorForm.value.date,
                   //  userAuth: authArray,
                };
                // this.administratorService.createUser(this.administrator.email_Address, 'admin01')
                //     .then((result) => {
                //         this.administrator.uid = result.user.uid;
                //     })
                //     .then((y) => {


                this.administratorService.updateAdminStaff(this.administrator)
                       .then(() => {
                        this.closeDialog(true);
                    });

                //         this.administratorService
                //             .add(this.administrator)
                //             .then(
                //                 (data) => {
                //                     this.closeDialog(true);
                //                 },
                //                 (error) => {}
                //             )
                //             .catch((error) => {});
                //    });
            }
        }
    }

    closeDialog(takeAction): void {
        this._matDialogRef.close({ action: takeAction });
    }

    /**
     * Get the form field helpers as string
     */
    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }
}
