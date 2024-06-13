import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthenticationResponseModel } from '../models/AuthenticationResponseModel';
import { RegisterRequest } from '../models/RegisterRequest';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private usuario$: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(new Usuario());

  constructor(private http: HttpClient) {
    if(this.isAuth()){
      this.updateUsuarioToken();
    }
   }

  Login(data: RegisterRequest): Observable<any> {
    return this.http.post<AuthenticationResponseModel>(`${environment.url}/auth/login`, data);
  }

  registrer(registrer: RegisterRequest): Observable<any> {
    return this.http.post<AuthenticationResponseModel>(`${environment.url}/auth/registrer`, registrer);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuth(): boolean {
    this.isAuth$.next(localStorage.getItem('token') ? true : false);
    return this.isAuth$.getValue();
  }

  isAuthObs(): Observable<boolean> {
    return this.isAuth$.asObservable();
  }

  getToken()  {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }
    return "";
  }

  getUsuarioOBs(): Observable<Usuario> {
    return this.usuario$.asObservable();
  }

  getUsuario(): Usuario {
    return this.usuario$.getValue();
  }

  setUsuario$(usuario: Usuario) {
    this.usuario$.next(usuario);
  }

  updateUsuarioToken():Observable<Usuario> {
    let token = this.getToken();
    if (token != null) {
      let usuario = new Usuario();
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      let json = JSON.parse(window.atob(base64));
      usuario.nombre = json['name'];
      usuario.apellido = json['last_name'];
      usuario.email = json['email'];
      this.setUsuario$(usuario);
    }
    return this.usuario$.asObservable();
  }

}
