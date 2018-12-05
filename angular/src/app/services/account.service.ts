import { Injectable } from '@angular/core';
import {User} from "../model/model.user";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import {AppComponent} from "../app.component";

@Injectable()
export class AccountService {
  constructor(public http: HttpClient) { }

  createAccount(user:User){
    return this.http.post(AppComponent.API_URL+'/auth/signup',user)
      .pipe(map(resp=>resp));
  }

    verifyAccount(token:string){
        return this.http.get(AppComponent.API_URL+'/auth/signup/activate/' + token)
            .pipe(map(resp=>resp));
    }
}
