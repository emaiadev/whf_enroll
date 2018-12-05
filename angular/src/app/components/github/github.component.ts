import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GithubService, IGitHubUser} from "../../services/github/github.service";
import {routerTransition} from "../routerTransition.component";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
    selector: 'app-github',
    animations: [routerTransition],
    templateUrl: './github.component.html',
    styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {
    listObservable: Observable<IGitHubUser[]>;
    since: number = 0;
    currentRate:number = 3;

    constructor(private githubService: GithubService,
                public router: Router,
                config: NgbRatingConfig) {
        // customize default values of ratings used by this component tree
        config.max = 5;
    }

    ngOnInit() {
        this.since = 0;
        this.getGithubUsers();
    }

    getGithubUsers() {
        this.listObservable = this.githubService.listGithubUsers(this.since);
    }

    rateUser(username:string, avatar_url:string){
        this.router.navigate(['/rate'], { queryParams: { login : username, avatar_url: avatar_url } } );
    }

    nextPage() {
        this.since = this.since + 46;
        this.getGithubUsers();
    }

    previousPage() {
        this.since = this.since - 46;
        if (this.since < 0) {
            this.since = 0;
        }
        this.getGithubUsers();
    }
}
