/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Parent_Type } from 'app/modules/admin/tools/models/parent';
import { Pupil } from '@models/pupil.js';
import { PupilRegistration } from 'app/modules/admin/tools/models/pupilRegistration';
import { Pupil_Type } from 'app/modules/admin/tools/models/pupilType';
import { PupilService } from 'app/modules/admin/tools/_services/pupil.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LearnerListComponent } from '../learner-list/learner-list.component';
import { Location } from '@angular/common';

//PDF  
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
@Component({
    selector: 'app-learner-info',
    templateUrl: './learner-info.component.html',
    styleUrls: ['./learner-info.component.scss'],
})
export class LearnerInfoComponent implements OnInit {
    learner: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    @ViewChild('learnerInfo') pdfTable: ElementRef;
    step = 0;

    //Form
    editPupilForm: FormGroup;
    pupil: PupilRegistration;
    pupilTypes: Pupil_Type[] = [];
    parentTypes: Parent_Type[] = [];
    Id: number;

    file_store: FileList;
    accept: string = 'image/*';
    selectedProType: any;
    display: FormControl = new FormControl('', Validators.required);

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _learnerListComponent: LearnerListComponent,
        private pupilService: PupilService,
        private activatedRoute: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private location: Location,
    ) {

        this.formInit();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Open the drawer

        this.pupilService.pupil$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((_learner: Pupil) => {
                // Open the drawer in case it is closed
                this._learnerListComponent.matDrawer.open();

                // Get the contact
                this.learner = _learner;

               
            });
    }

    onSubmit(): void {}
    /**
     * On destroy
     */
    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._learnerListComponent.matDrawer.close();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    //Stepper
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

    back(): void {
        this.location.back();
        this.closeDrawer();
    }

    public downloadAsPDF() {
        const doc = new jsPDF();
       
        const pdfTable = this.pdfTable.nativeElement;
       
        var html = htmlToPdfmake(pdfTable.innerHTML);
         
        const documentDefinition = { content: html };
        pdfMake.createPdf(documentDefinition).open(); 
         
      }

      
    handleFileInputChange(l: FileList): void {

        this.file_store = l;
        if (l.length) {
          const fs = l[0];
          const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
          this.display.patchValue(`${fs.name}${count}`);


        } else {
          this.display.patchValue('');
        }
      }
}
