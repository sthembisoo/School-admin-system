/* eslint-disable @typescript-eslint/naming-convention */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Parent_Type } from '../../tools/models/parent';
import { PupilRegistration } from '../../tools/models/pupilRegistration';
import { Pupil_Type } from '../../tools/models/pupilType';
import { Dialog } from '../../tools/_enums/dialog.enum';
import { PupilService } from '../../tools/_services/pupil.service';
import { ConfirmationUtilService } from '../../tools/_utils/confirmationUtil.service';
import { RegisterPupilComponent } from '../register-pupil/register-pupil.component';

@Component({
    selector: 'app-edit-pupil',
    templateUrl: './edit-pupil.component.html',
    styleUrls: ['./edit-pupil.component.scss'],
})
export class EditPupilComponent implements OnInit {
    editPupilForm: FormGroup;
    pupil: PupilRegistration;
    pupilTypes: Pupil_Type[] = [];
    parentTypes: Parent_Type[] = [];
    Id: number;


  step = 0;
  constructor(
    private _formBuilder: FormBuilder,
    private location: Location,
    private pupilService: PupilService,
    private _confirmation: ConfirmationUtilService,
    private activatedRoute: ActivatedRoute
) {
   // eslint-disable-next-line constructor-super
   this.getPupilTypes();
   this.getParentTypes();


}

  ngOnInit(): void {
      this.formInit();

      //get id in activatedRoute
      const id = this.activatedRoute.snapshot.paramMap.get('id');

      //get document
      this.pupilService.getDocument(id).then((document) => {
          this.editPupilForm.patchValue({
                pupil: {
                    ...document,
                },
                parent: document.parent[0],
                emergencyContact: document.emergencyContact,
                medicalDetails:  {
                 Condition_Description: document.medicalCondition.Condition_Description,
                Treatment_C: document.medicalCondition.Treatment,
                Allergy_Description: document.allergy.Allergy_Description,
                Treatment_A: document.allergy.Treatment,
                },
          });
      } );

  }

  formInit(): void {
    this.editPupilForm = this._formBuilder.group({
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
            Carreer: ['', [Validators.required]],
            Employer: [''],
            Parent_Type_ID: ['', [Validators.required]],
            ID_Number: ['', [Validators.required]],
            // ID_Documentation: [''],
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



  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setStep(index: number) {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }
  registerPupil(): void {
        //get id in activatedRoute
        this.Id = Number(this.activatedRoute.snapshot.paramMap.get('id'));


    }

    onSubmit(): void {
        this._confirmation.openConfirmationDialog(Dialog.ADD).subscribe((res: any) => {
            if (res === 'confirmed') {
                this.registerPupil();
            }
        });
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


    //get parent types
    getParentTypes(): void {
        this.pupilService.getParentTypes().then(
            (data: any) => {
                data.docs.forEach((type) => {
                    this.parentTypes.push({ ...type.data(), id: type.id });
                  });
            },
            (error) => {}
        );
    }
    back(): void {
        this.location.back();
    }
}
