/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FuseNavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
{
  constructor(
    private navigationservice: FuseNavigationService
  ) {
  }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.navigationservice.getUserRolev2();
    }
}

