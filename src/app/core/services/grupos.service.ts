import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grupo } from '../models/Grupo';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  url:string = environment.url + "/api";

  constructor(private http: HttpClient) { }

  /**
   * metodo para crear un grupo
   * @param grupo 
   * @returns 
   */
  crearGrupo(grupo:Grupo): Observable<any>{
    return this.http.post<Grupo>(`${this.url}/grupo/nuevoGrupo`, grupo);
  }

  /**
   * metodo para solicitar grupos de un usuario 
   * @param usuario 
   * @returns 
   */
  getGruposUsuario(usuario: Usuario): Observable<any> {
    return this.http.get<Grupo[]>(`${this.url}/grupo/grupos/usuario/${usuario.id}`);
  }

  /**
   * metodo para solicitar grupos de el usuario del token 
   * @returns 
   */
  getGrupoUsuarioToken() {
    return this.http.get<Grupo[]>(`${this.url}/grupo/grupos`);
  }

  /**
   * metodo para solicitar un grupo por id de grupo
   * @param idGrupo 
   * @returns grupo solicitado 
   */
  getGrupoPorId(idGrupo: string) {
    return this.http.get<Grupo>(`${this.url}/grupo/${idGrupo}`);
  }
}
