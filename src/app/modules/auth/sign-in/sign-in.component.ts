import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseNavigationService } from '@fuse/components/navigation';
import { AuthService } from 'app/core/auth/auth.service';
import { StaffMemberService } from 'app/modules/admin/tools/_services/staff-member.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
       private staffService: StaffMemberService,
       private navigationservice: FuseNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: [
                'admin@gmail.com',
                [Validators.required, Validators.email],
            ],
            password: ['123456', Validators.required],
            rememberMe: [''],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        this._authService.signIn(this.signInForm.value)
        .then((response) => {
            this._authService.setAuthentication(true);
            sessionStorage.setItem('uid', response.user.uid);
    //        this.navigationservice.getUserRole().then((dh)=>{

            // this._router.navigate(['/dashboard'])
            const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('dashboard') || '/signed-in-redirect';
                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);
                }).catch((error) => {

                      // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Wrong email or password',
                };
                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInNgForm.resetForm();
                // Show the alert
                this.showAlert = true;
        });


}

        // Sign in
        // this._authService.signIn(this.signInForm.value).subscribe(
        //     (response) => {
        //         const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('dashboard') || '/signed-in-redirect';
        //
        //         // Navigate to the redirect url
        //         this._router.navigateByUrl(redirectURL);
        //     },
        //     (error) => {
        //
        //         // Set the alert
        //         this.alert = {
        //             type: 'error',
        //             message: 'Wrong email or password',
        //         };
        //         // Re-enable the form
        //         this.signInForm.enable();

        //         // Reset the form
        //         this.signInNgForm.resetForm();
        //         // Show the alert
        //         this.showAlert = true;
        //     }
        // );
    }

