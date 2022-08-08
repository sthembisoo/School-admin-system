import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { ListProductComponent } from './list-product/list-product.component';
import { AddProductTypeComponent } from './product-type/add-product-type/add-product-type.component';
import { ListProductTypeComponent } from './product-type/list-product-type/list-product-type.component';
import { StocktakeComponent } from './stocktake/stocktake.component';
import { ListWriteOffComponent } from './write-off/list-write-off/list-write-off.component';

const routes: Routes = [

    {
        path: 'product-list',
        component: ListProductComponent,
      },
      {
          path: 'add-product',
          component: AddProductsComponent,
      },
      {
        path: 'product-type',
        component: ListProductTypeComponent,
      },
      {
        path: 'add-product-type',
        component: AddProductTypeComponent,
    },
    {
      path: 'stock-take',
      component: StocktakeComponent,
    }
    ,
    {
      path: 'write-off',
      component: ListWriteOffComponent,
    }

    



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
