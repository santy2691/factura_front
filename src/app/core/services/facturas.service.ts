import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../models/facturas';


@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  url:string = environment.url + "/api";
  
  constructor(private http: HttpClient) { }

  getFacturasPag(pagina:number, paginaSize:number) {
    return this.http.get<any>(`${this.url}/facturas/usuario?page=${pagina}&size=${paginaSize}`);
  }

  getFacturasUsuarioYGrupoPag(pagina:number, paginaSize:number, idGrupo: number) {
    return this.http.get<any>(`${this.url}/facturas/usuario/grupo?idGrupo=${idGrupo}&page=${pagina}&size=${paginaSize}`);
  }

  nuevaFactura(factura: Factura) {
    return this.http.post<any>(`${this.url}/factura/nuevafactura`,factura);
  }

}
