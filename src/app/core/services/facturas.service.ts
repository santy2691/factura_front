import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  url:string = environment.url + "/api";
  
  constructor(private http: HttpClient) { }

  getFacturasPag(pagina:number, paginaSize:number) {
    return this.http.get<any>(`${this.url}/facturas?page=${pagina}&size=${paginaSize}`);
  }
}
