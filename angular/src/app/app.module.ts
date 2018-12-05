import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {AccountService} from "./services/account.service";
import {ProfileComponent} from './components/profile/profile.component';
import {routing} from "./app.routing";
import {FacebookModule} from "ngx-facebook";
import {RegisterVerifyComponent} from './components/register-verify/register-verify.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './services/token.interceptor';
import {AuthGuardService} from "./services/auth-guard.service";
import {JwtHelperService, JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";
import {UsersComponent} from './components/users/users.component';
import {GithubComponent} from './components/github/github.component';
import {GithubService} from "./services/github/github.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ModalService} from "./services/modal.service";
import {DomService} from "./services/dom.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRateComponent } from './components/user-rate/user-rate.component';


const JWT_Module_Options: JwtModuleOptions = {
    config: {
        tokenGetter: tokenGetter
    }
};

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        RegisterVerifyComponent,
        UsersComponent,
        GithubComponent,
        UserRateComponent
    ],
    imports: [
        NgbModule,
        JwtModule.forRoot(JWT_Module_Options),
        BrowserModule, BrowserAnimationsModule,
        Ng4LoadingSpinnerModule.forRoot(),
        HttpClientModule, FormsModule, routing, FacebookModule.forRoot(),
    ],
    providers: [
        AuthService,
        AccountService,
        AuthGuardService,
        JwtHelperService, GithubService, ModalService, DomService, {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
