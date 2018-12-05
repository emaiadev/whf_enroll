import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {Observable} from "rxjs";
import {IGitHubUser} from "../../services/github/github.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
    constructor(public authService: AuthService,
                public router: Router,
                private spinnerService: Ng4LoadingSpinnerService) {
    }

    ngOnInit() {

    }
}
