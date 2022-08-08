import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffMemberService } from '@services/staff-member.service';
import {
    Rooms,
    typeAlphabets,
} from 'app/modules/admin/tools/_helper/helper_data';
import {
    ClassService,
    GradeService,
} from 'app/modules/admin/tools/_services/grade.service';
import { ToastrService } from 'ngx-toastr';
const _classTypes = typeAlphabets;
const _rooms = Rooms;
@Component({
    selector: 'app-addClass',
    templateUrl: './addClass.component.html',
    styleUrls: ['./addClass.component.scss'],
})
export class AddClassComponent implements OnInit {
    formFieldHelpers: string[] = [''];
    isEdit: boolean;
    classForm: FormGroup;
    submitted: boolean;
    header: string = 'Add Class';
    classTypes = _classTypes;
    Rooms = _rooms;
    gradeInfo: any;

    grades: any[] = [];
    teachers: any[] = [];

    isExist: boolean;

    //conditionals
    isExiting: boolean;
    constructor(
        private _formBuilder: FormBuilder,
        private classService: ClassService,
        private _matDialogRef: MatDialogRef<AddClassComponent>,
        private toastr: ToastrService,
        private staffMemberService: StaffMemberService,
        @Inject(MAT_DIALOG_DATA) private _data: {}
    ) {}

    ngOnInit() {
        this.gradeInfo = { ...this._data };
        this.formInit(false);
        this.onChanges();
        this.getClasses();
        this.getTeachers();
    }

    onChanges(): void {
        this.classForm.get('Type').valueChanges.subscribe((val) => {
            this.isExist = false;
            this.checkIfExits(val);
        });
    }

    public formInit(isEdit: boolean, id?: string): void {
        if (!isEdit) {
            //fprm initialize with validations
            this.classForm = this._formBuilder.group({
                GradeId: [this.gradeInfo.gradeId],
                grade: [this.gradeInfo.grade],
                Type: ['', Validators.required],
                Room: ['', Validators.required],
                NumberOfLearners: ['', Validators.required],
                TeacherInChargeId: ['', Validators.required],
            });
        }
    }

    onSubmit(): void {
        this.submitted = true;
        // stop here if form is invalid
        if (this.classForm.invalid) {
            return;
        } else {
            const _class: any = {
                ...this.classForm.value,
            };
            this.classService
                .add(_class)
                .then(
                    (data) => {
                        this.closeDialog();
                    },
                    (error) => {}
                )
                .catch((error) => {});
        }
    }

    closeDialog(): void {
        this._matDialogRef.close();
    }

    get f() {
        return this.classForm.controls;
    }

    checkIfExits(type): void {

        this.isExist = this.grades.some((el) =>{
            return el.Type == type && el.grade == this.gradeInfo.grade
        })

    }

    getClasses(): void {
        this.classService
            .getList()
            .then((response) => {
                this.grades = [];

                response.docs.forEach((type) => {
                    this.grades.push({ ...type.data(), id: type.id });
                });
            })
            .catch((error) => {});
    }
    getTeachers(): void {
        this.teachers =  this.staffMemberService.getTeachers()    
    }
}
