import {Component} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {routerTransition} from "./components/routerTransition.component";
import {AccountService} from "./services/account.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {AuthService} from "./services/auth.service";

@Component({
    selector: 'app-root',
    animations: [routerTransition],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'WHF Enroll App';
    static API_URL = "http://localhost:8000/api";

    constructor(public authService: AuthService,
                public router: Router,
                private spinnerService: Ng4LoadingSpinnerService) { }
    private previousPath: string = '';

    // login out from the app
    public logOut() {
        this.spinnerService.show();
        this.authService.logOut()
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                    this.spinnerService.hide();
                },
                error => {

                });
    }

    getPageTransition(routerOutlet: RouterOutlet) {
        if (routerOutlet.isActivated) {
            let transitionName = 'section';

            const { path } = routerOutlet.activatedRoute.routeConfig;
            const isSame = this.previousPath === path;
            const isBackward = this.previousPath.startsWith(path);
            const isForward = path.startsWith(this.previousPath);

            if (isSame) {
                transitionName = 'none'
            } else if (isBackward && isForward) {
                transitionName = 'initial'
            } else if (isBackward) {
                transitionName = 'backward'
            } else if (isForward) {
                transitionName = 'forward'
            }else{
                transitionName = 'none'
            }

            this.previousPath = path;

            return transitionName;
        }
    }
}
