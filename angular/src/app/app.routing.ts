import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RegisterVerifyComponent} from "./components/register-verify/register-verify.component";
import {
    AuthGuardService as AuthGuard
} from './services/auth-guard.service';
import {UsersComponent} from "./components/users/users.component";
import {GithubComponent} from "./components/github/github.component";
import {UserRateComponent} from "./components/user-rate/user-rate.component";

const appRoutes: Routes = [
    { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard]  },
    { path: 'github', component: GithubComponent, canActivate: [AuthGuard]  },
    { path: 'rate', component: UserRateComponent, canActivate: [AuthGuard]  },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register_verify', component: RegisterVerifyComponent },
    // otherwise redirect to profile
    { path: '**', redirectTo: '/profile' }
];

export const routing = RouterModule.forRoot(appRoutes);
