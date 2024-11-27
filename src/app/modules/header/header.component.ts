import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../drug/services/authentification.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authentificationService = inject(AuthentificationService);
  constructor(private router: Router) { }

  public onLogOut() {
    this.authentificationService.logOut()
    this.router.navigate(['/home'])
  }

  public isLogin(): boolean {
    return this.authentificationService.authenticated
  }
}


