/* eslint-disable @typescript-eslint/naming-convention */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fees } from '@models/fees.model';
import { FeesService } from '@services/Fees.service';
import { ClassService, GradeService } from '@services/grade.service';
import { PupilFeesService } from '@services/pupil-fees.service';
import { retry } from 'rxjs/operators';
import { Parent_Type } from '../../tools/models/parent';
import { PupilRegistration } from '../../tools/models/pupilRegistration';
import { Pupil_Type } from '../../tools/models/pupilType';
import { Dialog } from '../../tools/_enums/dialog.enum';
import { PupilService } from '../../tools/_services/pupil.service';
import { ToastService } from '../../tools/_toast/toast.service';
import { ConfirmationUtilService } from '../../tools/_utils/confirmationUtil.service';
@Component({
    selector: 'app-register-pupil',
    templateUrl: './register-pupil.component.html',
    styleUrls: ['./register-pupil.component.scss'],
})
export class RegisterPupilComponent implements OnInit {
    registerPupilForm: FormGroup;
    pupil: PupilRegistration;
    pupilTypes: Pupil_Type[] = [];
    parentTypes: Parent_Type[] = [];
    feesList: Fees[] = [];
    paymentInfo: Fees;
    gradeList: any[] = [];
    classList: any[] = [];
    filteredClassList: any[] = [];
    feesIsLoaded: boolean;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _confirmation: ConfirmationUtilService,
        private location: Location,
        private pupilService: PupilService,
        private feesService: FeesService,
        private gradeService: GradeService,
        private classService: ClassService,
        private pupilFeesService: PupilFeesService,
        private toastService: ToastService
    ) {
        this.getParentTypes();
        this.getPupilTypes();
        this.getGrades();
        this.getClasses();
    }

    ngOnInit(): void {
        this.formInit();
        this.getGradeSelected();
        this.getFeesInfo();
    }

    formInit(): void {
        this.registerPupilForm = this._formBuilder.group({
            pupil: this._formBuilder.group({
                Name: ['', Validators.required],
                Surname: ['', Validators.required],
                Home_Language: ['', Validators.required],
                Pupil_Type_ID: ['', Validators.required],
                Gender_ID: ['', Validators.required],
                Previous_School: ['', Validators.required],
                Physical_Address: ['', Validators.required],
                Postal_Address: ['', Validators.required],
                Residence_Documentation: [''],
                proofOfResidence: [''],
                Grade: ['', Validators.required],
                Class: ['', Validators.required],
                FeePaymentType: ['', Validators.required],
            }),
            parent: this._formBuilder.group({
                Name: ['', Validators.required],
                Surname: ['', Validators.required],
                Email_Address: ['', [Validators.required, Validators.email]],
                Contact_Number: [
                    '',
                    [Validators.required, Validators.minLength(10)],
                ],
                Home_Contact_Number: [
                    '',
                    [Validators.required, Validators.minLength(10)],
                ],
                Work_Contact_Number: [
                    '',
                    [Validators.required, Validators.minLength(10)],
                ],
                Career: ['', [Validators.required]],
                Employer: [''],
                Parent_Type_ID: ['', [Validators.required]],
                ID_Number: ['', [Validators.required]],
                Address: [''],
            }),
            emergencyContact: this._formBuilder.group({
                Name: ['', Validators.required],
                Surname: ['', Validators.required],
                Contact_Number: ['', [Validators.required]],
                Relationship_To_Pupil: ['', [Validators.required]],
                Career: ['', [Validators.required]],
                Physical_Address: ['', [Validators.required]],
            }),
            medicalDetails: this._formBuilder.group({
                Condition_Description: ['', [Validators.required]],
                Treatment_C: ['', [Validators.required]],
                Allergy_Description: ['', [Validators.required]],
                Treatment_A: ['', [Validators.required]],
                medicalAidName: [''],
                medicalAidNumber: [''],
            }),
        });
    }

    onSubmit(): void {
        this._confirmation
            .openConfirmationDialog(Dialog.ADD)
            .subscribe((res: any) => {
                if (res === 'confirmed') {
                    this.registerPupil();
                }
            });
    }

    //submit form
    public registerPupil(): void {
        const pupil = this.registerPupilForm.value.pupil;
        const parent = this.registerPupilForm.value.parent;
        const emergencyContact = this.registerPupilForm.value.emergencyContact;
        const medicalDetails = this.registerPupilForm.value.medicalDetails;
        const pupilDetails = {
            ...pupil,
            parent: [
                {
                    ...parent,
                },
            ],
            emergencyContact: {
                ...emergencyContact,
            },
            medicalCondition: {
                Condition_Description: medicalDetails.Condition_Description,
                Treatment: medicalDetails.Treatment_C,
            },
            allergy: {
                Allergy_Description: medicalDetails.Allergy_Description,
                Treatment: medicalDetails.Treatment_A,
            },
            activities: ['list of activities'],
        };

        this.pupilService.add(pupilDetails).then(
            (data) => {
                data.id;
                this.pupilFeesService
                    .AddStudentFee(data.id, this.paymentInfo)
                    .then(
                        () => {},
                        (err) => {
                            console.log(err);
                        }
                    );
                this.toastService.showSuccess(
                    'Learner has been successfuly added'
                );
            },
            (error) => {
                //
            }
        );
    }

    //get pupil types
    getPupilTypes(): void {
        this.pupilService.getTypes().then(
            (data: any) => {
                data.docs.forEach((type) => {
                    this.pupilTypes.push({ ...type.data(), id: type.id });
                });
            },
            (error) => {}
        );
    }

    //getLatestGradeSelection

    getGradeSelected() {
        this.registerPupilForm
            .get('pupil.Grade')
            .valueChanges.subscribe((selectedValue) => {
                this.filteredClassList = [];

                this.classList.forEach((data: any) => {
                    if (data.GradeId == selectedValue)
                        this.filteredClassList.push(data);
                });
            });
    }

    getFeesInfo() {
        this.registerPupilForm
            .get('pupil.FeePaymentType')
            .valueChanges.subscribe(async (selectedValue) => {
                await this.getFees(
                    this.registerPupilForm.get('pupil.Grade').value,
                    selectedValue
                );
            });
    }

    async getParentTypes(): Promise<void> {
        const snapshot = await this.pupilService
            .getParentTypes()
            .then((data: any) => {
                data.docs.forEach((type) => {
                    this.parentTypes.push({ ...type.data(), id: type.id });
                });
            });
    }

    //get grades and classes and fees
    getGrades(): void {
        this.gradeService.getList().then(
            (data: any) => {
                data.docs.forEach((type) => {
                    this.gradeList.push({ ...type.data(), id: type.id });
                });
            },
            (error) => {}
        );
    }

    getClasses(): void {
        this.classService.getList().then(
            (data: any) => {
                data.docs.forEach((type) => {
                    this.classList.push({ ...type.data(), id: type.id });
                });
            },
            (error) => {}
        );
    }


    async getFees(gradeID, PaymentType): Promise<void> {
        let data = await this.feesService
            .getFeesApplicable(gradeID, PaymentType)
            .then(async (res) => {
                return res.pipe(retry(3)).subscribe((rs) => {
                    let data = rs.map((a) => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        const type = a.type;
                        this.feesIsLoaded = true;
                        return { id, type, ...data };
                    });

                    this.paymentInfo = data.find(
                        (check) => check.PaymentType == PaymentType
                    );
                });
            });
    }

    onCancel(event): void {}
    back(): void {
        this.location.back();
    }
}
