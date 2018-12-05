import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {GithubService, IGitHubUser} from "../../services/github/github.service";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-user-rate',
    templateUrl: './user-rate.component.html',
    styleUrls: ['./user-rate.component.css']
})
export class UserRateComponent implements OnInit {
    sub:Subscription;
    username:string;
    avatar_url:string;
    listObservable: Observable<IGitHubUser[]>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private githubService:GithubService,
                config: NgbRatingConfig) {
        // customize default values of ratings used by this component tree
        config.max = 5;
    }

    rateClick(rate){
        this.githubService.rateUser(this.username, rate).subscribe(params => {
            this.router.navigate(['/github']);
        })
    }

    ngOnInit() {
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.username = params['login'];
                this.avatar_url = params['avatar_url'];
            });
    }
}
