import { Route } from '@angular/router';
import { LearnerListComponent } from './learner-list/learner-list.component';
import { LearnerInfoComponent } from './learner-info/learner-info.component';
import { GradeDetailsComponent } from './grade-details.component';
import { CanDeactivateDetails } from './details.guards';
import { LearnerResolver, PupilsResolver } from './grade-manager.resolvers';

export const gradesRoutes: Route[] = [
    {
        path     : '',
        component: GradeDetailsComponent,
        children : [

            {
                path     : '',
                component: LearnerListComponent,
                resolve  : {
                    items: PupilsResolver
                },
                children : [
                    {
                        path         : ':learnerId',
                        component    : LearnerInfoComponent,
                        resolve  : {
                            items: LearnerResolver
                        },
                        canDeactivate: [CanDeactivateDetails]
                    }
                ]
            }
        ]
    }
];
