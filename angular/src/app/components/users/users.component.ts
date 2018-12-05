import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {Observable} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    listObservable: Observable<any[]>;

    constructor(public authService: AuthService,
                public router: Router,
                private spinnerService: Ng4LoadingSpinnerService) {
    }

    ngOnInit() {
        this.getAppUsers();
    }

    getAppUsers() {
        this.spinnerService.show();
        this.listObservable = this.authService.listUsers();
        this.spinnerService.hide();
    }

}
