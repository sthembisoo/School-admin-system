import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { ProductService } from 'app/modules/admin/tools/_services/product.service';
import { FuseCardModule } from '@fuse/components/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogProductComponent } from './dialog-product/dialog-product.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByKeyPipeModule } from 'app/modules/admin/tools/_pipes/filter-by-key-pipe.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseAlertModule } from '@fuse/components/alert';


@NgModule({
  declarations: [
    ListComponent,
    DialogProductComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    FuseCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    FilterByKeyPipeModule,
    ProductsRoutingModule,
    FuseAlertModule,
  ],
  providers: [DatePipe]
})
export class ProductsModule { }
