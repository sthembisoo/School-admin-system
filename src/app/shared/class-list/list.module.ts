import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';
import { ListComponent } from './list.component';

@NgModule({
    declarations: [ListComponent],
    providers: [],
    imports: [CommonModule, SharedModule,RouterModule],
    exports: [ListComponent],
})
export class ClassModule {}
