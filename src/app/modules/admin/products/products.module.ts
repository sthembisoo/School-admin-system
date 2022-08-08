import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AddProductsComponent } from './add-products/add-products.component';
import { SharedModule } from 'app/shared/shared.module';
import { ProductService } from '../tools/_services/product.service';
import { ListProductComponent } from './list-product/list-product.component';
import { AddProductTypeComponent } from './product-type/add-product-type/add-product-type.component';
import { ListProductTypeComponent } from './product-type/list-product-type/list-product-type.component';
import { WriteOffComponent } from './write-off/write-off.component';
import { ListWriteOffComponent } from './write-off/list-write-off/list-write-off.component';
import { StocktakeComponent } from './stocktake/stocktake.component';
import { AddStockTakeComponent } from './stocktake/add-stock-take/add-stock-take.component';

@NgModule({
  declarations: [
    AddProductsComponent,
    ListProductComponent,
    AddProductTypeComponent,
    ListProductTypeComponent,
    WriteOffComponent,
    ListWriteOffComponent,
    StocktakeComponent,
    AddStockTakeComponent,
  ],
  providers: [ProductService],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
