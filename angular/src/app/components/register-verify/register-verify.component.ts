import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription} from "rxjs";
import {AccountService} from "../../services/account.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";

@Component({
  selector: 'app-register-verify',
  templateUrl: './register-verify.component.html',
  styleUrls: ['./register-verify.component.css']
})
export class RegisterVerifyComponent implements OnInit {

  sub:Subscription;
  token:string;

    constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        public accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router) {}

  ngOnInit() {
      this.sub = this.route
      .queryParams
      .subscribe(params => {
          this.token = params['token'];
      });
  }

    activate(){
        this.spinnerService.show();
        this.accountService.verifyAccount(this.token).subscribe(data => {
                this.router.navigate(['/login']);
            this.spinnerService.hide();
            }, err => {
                this.router.navigate(['/login']);
            this.spinnerService.hide();
            }
        )
    }
}
