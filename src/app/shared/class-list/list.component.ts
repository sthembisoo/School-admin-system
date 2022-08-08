/* eslint-disable eqeqeq */
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '@services/grade.service';
import { AddClassComponent } from 'app/modules/admin/grades/_modals/addClass/addClass.component';

@Component({
    selector: 'app-class-card',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    @Input() class: any;
    @Input() isTeacher: boolean;

    classes: any[] = [];


    number = Math.floor(Math.random() * 4);
    isLoaded: boolean;

    constructor(private router: Router, private _matDialog: MatDialog,) {}

    ngOnInit(): void {
        console.log(this.isTeacher);
    }
    navigateToList(_class) {
        this.router.navigate([_class.id])
    }

    color(): string {
        const colorHandler = [
            'text-blue-500',
            'text-green-500',
            'text-amber-500',
            'text-red-500',
            'text-purple-500',
        ];
        return colorHandler[this.number];
    }

    EditClass(gradeInfo): void {
        const dialogRef = this._matDialog.open(AddClassComponent, {
            autoFocus: false,
            data: {
               ...gradeInfo,
            },
        });
        dialogRef.afterClosed().subscribe((res) => {});
    }
}
