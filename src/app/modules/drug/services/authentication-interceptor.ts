/**
 * https://angular.io/guide/http-interceptor-use-cases#set-default-headers
 */

import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthentificationService } from "./authentification.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(public authentificationService: AuthentificationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.authentificationService.authenticated) {
            return next.handle(req);
        }
        req = req.clone({
            setHeaders: {
                Authorization: this.authentificationService.authorizationHeader
            }
        });

        return next.handle(req);
    }

}
