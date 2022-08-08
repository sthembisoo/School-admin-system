import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ListComponent } from './list/list.component';
import { InitialDataResolver } from './product.resolvers';

const routes: Routes = [

    {
            path: 'staff-pro',
            resolve: {
                initialData: InitialDataResolver
            },
            component: ListComponent,

    },
    {
        path: 'Cart',
        component: CartComponent,

},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
