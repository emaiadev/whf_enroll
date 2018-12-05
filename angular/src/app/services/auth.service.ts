import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../model/model.user";
import {map} from "rxjs/operators";
import {AppComponent} from "../app.component";
import {Login} from "./login";
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
    constructor(public http: HttpClient,
                public jwtHelper: JwtHelperService) {
    }

    public isAuthenticated(): boolean {
        let token = localStorage.getItem('accessToken');
        // Check whether the token is expired and return
        // true or false
        if (token) {
            return !this.jwtHelper.isTokenExpired(token);
        } else {
            return false;
        }
    }

    public logIn(user: User) {
        let login = new Login(user.email, user.password, false);

        return this.http.post(AppComponent.API_URL + "/auth/login", JSON.stringify(login))
            .pipe(map((response: Response) => {
                // login successful if there's a jwt token in the response
                if (response['access_token']) {
                    // store user details  in local storage to keep user logged in between page refreshes
                    localStorage.setItem('accessToken', response['access_token']);
                }
            }));
    }

    public getToken(): string {
        return localStorage.getItem('accessToken');
    }

    listUsers(): Observable<any[]> {
        return this.http.get(AppComponent.API_URL + "/user/list")
            .pipe(map((response: Response) => {
                return response;
            }));
    }

    logOut() {
        // remove user from local storage to log user out
        return this.http.get(AppComponent.API_URL + "/auth/logout")
            .pipe(map((response: Response) => {

                console.log(response);

                localStorage.removeItem('accessToken');
            }));
    }
}
