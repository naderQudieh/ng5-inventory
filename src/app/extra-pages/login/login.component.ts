import { Component } from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'my-page-login',
  styles: [],
  templateUrl: './login.component.html'
})

export class PageLoginComponent {

    message = '';
    form: FormGroup;
    emailFormControl: FormControl;
    loading = false;
    s1: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService,
                private formBuilder: FormBuilder) { }

    ngOnInit() {

        this.buildForm();

        this.s1 = this.route.queryParams.subscribe((params: Params) => {
            if (params['accessDenied']) {
                this.message = 'Please login to system';
                setTimeout(() => {
                    this.message = '';
                }, 2500);
            }
        })

    }

    ngOnDestroy() {
        if (this.s1) {
            this.s1.unsubscribe();
        }
    }


    buildForm() {
        this.form = this.formBuilder.group({
            emailFormControl: this.formBuilder.control('', [Validators.required, Validators.email]),
            passwordFormControl: this.formBuilder.control('', [Validators.required]),
        });
    }


    onSubmit() {
        this.loading = true;
        const data = this.form.value;
        this.authService.loginWithEmail(data.emailFormControl, data.passwordFormControl)
            .then((success) => {
                this.router.navigate(['/app/system/computers']);
            }).catch((error) => {
            this.message = error.message;
            setTimeout(() => {
                this.message = '';
            }, 3000);
        });


    }

}
