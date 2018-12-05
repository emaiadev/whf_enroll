import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../../model/model.user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
    user: User = new User();
    errorMessage: string;

    constructor(private authService: AuthService,
                private router: Router,
                private spinnerService: Ng4LoadingSpinnerService) {
    }

    ngOnInit() {
    }

    login() {
        this.spinnerService.show();
        this.authService.logIn(this.user)
            .subscribe(data => {
                    this.router.navigate(['/profile']);
                }, err => {
                    this.spinnerService.hide();
                    this.errorMessage = "Email or password is incorrect";
                }
            )
    }
}
