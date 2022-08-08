/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProductService } from 'app/modules/admin/tools/_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
{

  constructor(
    private productservice: ProductService
  ) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     //  this.productservice.getAllProducts();
    }
}
