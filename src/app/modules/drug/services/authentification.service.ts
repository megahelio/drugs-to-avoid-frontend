import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/enviroment';
import { User } from 'src/app/entities/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private user: User
  baseUrl = `${environment.dtaUrl}`
  constructor(protected http: HttpClient) {
    this.user = new User()
  }


  /**
   * Verifica las credenciales del usuario.
   * @param {string} username - El nombre de usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Observable<boolean>} - Un observable que emite un valor booleano indicando si las credenciales son válidas.
   */
  public checkCredentials(username: string, password: string): Observable<Boolean> {
    const authHeader = 'Basic ' + btoa(username + ':' + password)
    return this.http.post<boolean>(`${this.baseUrl}users/login`, null, { headers: new HttpHeaders().append("Authorization", authHeader) })
  }

  public logIn(username: string, password: string): void {
    this.user.username = username
    this.user.authHeader = 'Basic ' + btoa(username + ':' + password) //Base 64
    this.user.authenticated = true
    this.user.save();
  }
  public logOut(): void {
    this.user.clear()
    this.user = new User()
  }

  get authenticated(): boolean {
    return this.user.authenticated;
  }

  get authorizationHeader(): string {
    return this.user.authHeader;
  }
}
