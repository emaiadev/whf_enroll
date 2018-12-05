import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../../model/model.user";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

    constructor(public accountService: AccountService,
                public router: Router,
                private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }

  register() {
      this.spinnerService.show();
    this.accountService.createAccount(this.user).subscribe(data => {
        this.spinnerService.hide();
            this.router.navigate(['/register_verify'], { queryParams: { token : data.activation } } );
      }, err => {
        this.spinnerService.hide();
        let parsed = JSON.parse(err._body);

        parsed.errors.password.forEach((value) => {
            this.errorMessage = value;
        });
        parsed.errors.email.forEach((value) => {
            this.errorMessage = value;
        });
        this.spinnerService.hide();
      }
    )
  }
}
