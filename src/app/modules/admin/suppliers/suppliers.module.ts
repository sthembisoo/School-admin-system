import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersComponent } from './suppliers.component';
import { SuppliersRoutingModule } from './suppliers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SuppliersRoutingModule
  ],
  declarations: [SuppliersComponent]
})
export class SuppliersModule { }
