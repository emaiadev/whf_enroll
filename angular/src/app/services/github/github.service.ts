import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import {AppComponent} from "../../app.component";
import {Observable} from "rxjs";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";

export interface IGitHubUser {
    id: number,
    login: string,
    avatar_url: string,
    html_url:string
}

export class GitHubUserRate {
    username: string;
    rate:number;
}


@Injectable()
export class GithubService {
    constructor(public http: HttpClient,
                private spinnerService: Ng4LoadingSpinnerService){
    }

    rateUser(username: string, rate:number) {

        let rateObject = new GitHubUserRate();
        rateObject.username = username;
        rateObject.rate = rate;

        this.spinnerService.show();
        return this.http.post(AppComponent.API_URL + "/github/rate", JSON.stringify(rateObject))
            .pipe(map((response: Response) => {
                this.spinnerService.hide();
                // login successful if there's a jwt token in the response
                return response;
            }));
    }


    listGithubUsers(since:number): Observable<IGitHubUser[]> {
        this.spinnerService.show();
        return this.http.get(AppComponent.API_URL + "/github/list/" + since)
            .pipe(map((response: Response) => {
                this.spinnerService.hide();
                return response;
            }));
    }
}
