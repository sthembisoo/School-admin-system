import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { levels } from 'app/modules/admin/tools/_helper/helper_data';
import { GradeService } from 'app/modules/admin/tools/_services/grade.service';
import { ToastrService } from 'ngx-toastr';
const _levels =  levels
@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.scss']
})
export class AddGradeComponent implements OnInit {
  formFieldHelpers: string[] = [''];
  isEdit: boolean;
  gradeForm: FormGroup;
  submitted: boolean;
  header: string = 'Add Grade';
  levels = _levels

  constructor(
      private _formBuilder: FormBuilder,
      private gradeService: GradeService,
      private _matDialogRef: MatDialogRef<AddGradeComponent>,
      private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.formInit(false)
  }

  
  public formInit(isEdit: boolean, id?: string): void {
    if (!isEdit) {
        //fprm initialize with validations
        this.gradeForm = this._formBuilder.group({
            Grade: ['',  [ Validators.required,Validators.minLength(1), Validators.maxLength(12)]],
            Level: ['', Validators.required],
        })
      }
    }

    onSubmit(): void {
      this.submitted = true;
      // stop here if form is invalid
      if (this.gradeForm.invalid) {
          return;
      } else {
        if(Number(this.gradeForm.value.Grade) > 0 &&  Number(this.gradeForm.value.Grade) < 13)
        {
          const grade: any = {
            Grade: this.gradeForm.value.Grade,
            Level: this.gradeForm.value.Level,
        };
        this.gradeService.add(grade).then(
            (data) => {
               
                this.closeDialog();
            },
            (error) => {
               
            }
              ).catch((error) => {
                 
              });
          }
          else {
            this.toastr.error("Grade should nbe 1 - 12")
          }
        }
 
      }

      closeDialog(): void {
        this._matDialogRef.close();
    }
  


    get f() {
      return this.gradeForm.controls;
  }
}
