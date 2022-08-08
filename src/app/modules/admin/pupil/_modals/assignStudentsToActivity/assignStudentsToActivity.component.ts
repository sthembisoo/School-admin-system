/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pupil } from '@models/pupil';
import { PupilService } from 'app/modules/admin/tools/_services/pupil.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { takeUntil, take } from 'rxjs/operators';
import { Dialog } from 'app/modules/admin/tools/_enums/dialog.enum';
import { ConfirmationUtilService } from '@utils/confirmationUtil.service';



@Component({
  selector: 'app-assignStudentsToActivity',
  templateUrl: './assignStudentsToActivity.component.html',
  styleUrls: ['./assignStudentsToActivity.component.scss']
})
export class AssignStudentsToActivityComponent implements OnInit {

  public pupils: Pupil[] =  [];
  public allPupilSize;

    /** control for the selected bank for multi-selection */
    public pupilMultiCtrl: FormControl = new FormControl();
 /** control for the MatSelect filter keyword multi-selection */
 public pupilMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredPupilMulti: ReplaySubject<Pupil[]> = new ReplaySubject<Pupil[]>(1);

  /** local copy of filtered banks to help set the toggle all checkbox state */
  protected filteredPupilsCache: Pupil[] = [];
  /** flags to set the toggle all checkbox state */
  isIndeterminate = false;
  isChecked = false;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();

  /** Subject that emits when the component has been destroyed. */
  constructor(
      private _formBuilder: FormBuilder,
      private pupilService: PupilService,
      private _matDialogRef: MatDialogRef<AssignStudentsToActivityComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: { pupils: any; activityId: string },
        private _confirmation: ConfirmationUtilService

  ) {
    this.pupils = _data.pupils;
  }
  ngOnInit(): void {

   
     // load the initial bank list
     this.filteredPupilMulti.next(this.pupils.slice());

     // listen for search field value changes
     this.pupilMultiFilterCtrl.valueChanges
       .pipe(takeUntil(this._onDestroy))
       .subscribe(() => {
         this.filterMulti();
         this.setToggleAllCheckboxState();
       });

             // listen for multi select field value changes
    this.pupilMultiCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.setToggleAllCheckboxState();
    });


  }



  //addStudentToActivity
  addStudentToActivity(): void {
    const pupilsIds: string[] = [];
    this.pupilMultiCtrl.value.forEach((pupil) => {
      pupilsIds.push(pupil.id);
    });
   
      this.pupilService.addPupilsToActivity(pupilsIds, this._data.activityId).subscribe((pupils) => {
          this.pupils = pupils;
         
      });
  }


   //deleteEvent
    unassign(pupil): void {
        this._confirmation.openConfirmationDialog(Dialog.REMOVE).subscribe((res: any) => {
            if (res === 'confirmed') {
                // this.pupilService
                //     .unassignStudent(pupil.Pupil_ID)
                //     .subscribe(() => {
                //         this.getPupils();
                //     });
            }
        });
    }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  toggleSelectAll(selectAllValue: boolean): void {
    this.filteredPupilMulti.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe((val) => {
        if (selectAllValue) {
          this.pupilMultiCtrl.patchValue(val);
        } else {
          this.pupilMultiCtrl.patchValue([]);
        }
      });
  }

    /**
     *  * Sets the initial value after the filteredBanks are loaded initially
     *  */
     protected setInitialValue(): void {
      this.filteredPupilMulti
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          // setting the compareWith property to a comparison function
          // triggers initializing the selection according to the initial value of
          // the form control (i.e. _initializeSelection())
          // this needs to be done after the filteredBanks are loaded initially
          // and after the mat-option elements are available
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          this.multiSelect.compareWith = (a: Pupil, b: Pupil) => a && b && a.pupil_ID === b.pupil_ID;
        });
    }
    protected filterMulti(): any {
      if (!this.pupils) {
        return;
      }
      // get the search keyword
      let search = this.pupilMultiFilterCtrl.value;
      if (!search) {
        this.filteredPupilsCache = this.pupils.slice();
        this.filteredPupilMulti.next(this.filteredPupilsCache);
        return;
      } else {
        search = search.toLowerCase();
      }
      // filter the pupils
      this.filteredPupilsCache = this.pupils.filter(pupil => pupil.Name.toLowerCase().indexOf(search) > -1 || pupil.Surname.toLowerCase().indexOf(search) > -1);
      this.filteredPupilMulti.next(this.filteredPupilsCache);
    }

    protected setToggleAllCheckboxState(): void {
      let filteredLength = 0;
      if (this.pupilMultiCtrl && this.pupilMultiCtrl.value) {
        this.filteredPupilsCache.forEach((el) => {
          if (this.pupilMultiCtrl.value.indexOf(el) > -1) {
            filteredLength++;
          }
        });
        this.isIndeterminate = filteredLength > 0 && filteredLength < this.filteredPupilsCache.length;
        this.isChecked = filteredLength > 0 && filteredLength === this.filteredPupilsCache.length;
      }
    }

}
