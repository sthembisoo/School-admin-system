/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../../tools/_services/grade.service';
import { AddClassComponent } from '../../_modals/addClass/addClass.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    classes: any[] = [];
    gradeInfo = {
        gradeId: '',
        grade: null,
    };
    number = Math.floor(Math.random() * 4);

    isLoaded: boolean;

    constructor(
        private classService: ClassService,
        private _matDialog: MatDialog,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.gradeInfo.gradeId =
            this.activatedRoute.snapshot.paramMap.get('gradeId');
        this.activatedRoute.queryParams.subscribe((params) => {
            // Defaults to 0 if no query param provided.
            this.gradeInfo.grade = +params['grade'] || 0;
        });

        this.getListOfClasses(this.gradeInfo.gradeId);
    }

    getListOfClasses(gradeId: string) {
        return this.classService
            .getListFiltered('GradeId', gradeId)
            .subscribe((response) => {
                this.classes = [];
                this.classes = response.map((a) => {
                    const data = a.payload.doc.data();
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    const id = a.payload.doc.id;
                    const type = a.type;
                    return { id, type, ...data };
                });
                this.classes.sort(function (a, b) {
                    return a.Type - b.Type;
                });
                this.isLoaded = true;
                console.log(this.classes);
            });
    }

    /**
     * Add a new class
     */
    addNewClass(): void {
        const dialogRef = this._matDialog.open(AddClassComponent, {
            autoFocus: false,
            data: {
                ...this.gradeInfo,
            },
        });
        dialogRef.afterClosed().subscribe((res) => {});
    }
}
