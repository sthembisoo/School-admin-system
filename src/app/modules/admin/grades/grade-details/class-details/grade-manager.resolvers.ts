import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PupilService } from '../../../tools/_services/pupil.service';

@Injectable({
    providedIn: 'root'
})
export class PupilsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _pupilService: PupilService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>
    {
       
        return this._pupilService.getListOfStudentsInGrade(route.paramMap.get('classId'));
    }
}






@Injectable({
    providedIn: 'root'
})
export class LearnerResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _pupilService: PupilService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        try {
            await this._pupilService.getLearnerInGrade(route.paramMap.get('learnerId'));
        } catch {
            const parentUrl = state.url.split('/').slice(0, -1).join('/');
        }
    }
}
