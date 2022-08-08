import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiErrorsInterceptor } from 'app/modules/admin/tools/_helper/api-error.interceptor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NavigateBackModule } from './navigate-back/navigate-back.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoaderComponent } from './loader/loader.component';
import { ClassModule } from './class-list/list.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaintenanceModule } from './maintenance/maintenance.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatMomentDateModule,
        MatSelectModule,
        FuseHighlightModule,

        MatStepperModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatRadioModule,

        MatToolbarModule,
        NgxMatSelectSearchModule,
        MatSlideToggleModule,
        NavigateBackModule,
        MatPaginatorModule,
        NgbModule,
        
    ],
    exports: [
        MatTooltipModule,
        CommonModule,
        NavigateBackModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatMomentDateModule,
        MatSelectModule,
        FuseHighlightModule,

        MatStepperModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatRadioModule,

        MatToolbarModule,
        NgxMatSelectSearchModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        LoaderComponent,
        NgbModule,
        // MaintenanceModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ApiErrorsInterceptor, multi: true }

    ],
    declarations: [
        LoaderComponent
    ]
})
export class SharedModule
{
}
