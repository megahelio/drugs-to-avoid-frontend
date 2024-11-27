import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'src/app/validators/whitespaces.validator';
import { TOASTR_TOKEN, Toastr } from '../drug/services/toastr.service';
import { AuthentificationService } from '../drug/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public login = { username: "", password: "" }
  public loginForm: FormGroup;
  constructor(private authentificationService: AuthentificationService, private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginForm = new FormGroup({
      username: new FormControl(this.login.username, [Validators.required, Validators.minLength(4), Validators.maxLength(32), noWhitespaceValidator()]),
      password: new FormControl(this.login.password, [Validators.required])
    })
  }
  public onLogin() {
    const username = this.loginForm.get("username")?.value
    const password = this.loginForm.get("password")?.value
    this.authentificationService.checkCredentials(username, password).subscribe({
      next: () => {
        this.authentificationService.logIn(username, password);
        this.router.navigate(['/drugs/crud'])
      },
      error: () => {
        this.toastr.error($localize`${"Compruebe las credenciales o intentelo más tarde"}`, $localize`${"No pude entrar a la cuenta"}`)
      }
    }
    )
  }

  //Llamado en la plantilla: <mat-error *ngIf="username.invalid && (username!.dirty || username!.touched)"> por ejemplo
  get username() { return this.loginForm.get('username')!; }

  get password() { return this.loginForm.get('password')!; }
}

