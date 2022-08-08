/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
// @formatter:off
// tslint:disable:max-line-length
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'sign-in'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboard'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            // eslint-disable-next-line max-len
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            authGuardPipe: redirectUnauthorizedToLogin ,
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AngularFireAuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule)},
            {path: 'events', loadChildren: () => import('app/modules/admin/events/events.module').then(m => m.EventsModule)},
            // eslint-disable-next-line max-len
            {path: 'extra-mural-activities', loadChildren: () => import('app/modules/admin/extra-mural-activities/extra-mural-activities.module').then(m => m.ExtraMuralActivitiesModule)},
            {path: 'pupil', loadChildren: () => import('app/modules/admin/pupil/pupil.module').then(m => m.PupilModule)},
            {path: 'staff', loadChildren: () => import('app/modules/admin/staff-members/staff-members.module').then(m => m.StaffMembersModule)},
            {path: 'administrators', loadChildren: () => import('app/modules/admin/administrators/administrators.module').then(m => m.AdministratorsModule)},
            {path: 'Products', loadChildren: () => import('app/modules/admin/products/products.module').then(m => m.ProductsModule)},
            {path: 'staff-Products', loadChildren: () => import('app/modules/staff/products/products.module').then(m => m.ProductsModule)},
            {path: 'suppliers', loadChildren: () => import('app/modules/admin/suppliers/suppliers.module').then(m => m.SuppliersModule)},
            {path: 'grades', loadChildren: () => import('app/modules/admin/grades/grades.module').then(m => m.GradesModule)},
            {path: 'fees', loadChildren: () => import('app/modules/admin/fees/fee.module').then(m => m.FeesModule)},
            {path: 'reports', loadChildren: () => import('app/modules/admin/reports/reports.module').then(m => m.ReportsModule)},
            {path: 'myclasses', loadChildren: () => import('app/modules/staff/teacher/my-classes/my-classes.module').then(m => m.MyClassesModule)},
            {path: 'calendar', loadChildren: () => import('app/shared/calendar/calendar.module').then(m => m.CalendarModule)},

        ]
    }
];
