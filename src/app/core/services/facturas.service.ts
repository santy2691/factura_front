import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../models/facturas';
import { BehaviorSubject, Observable } from 'rxjs';
import { EstadisticaGrupoFacturas } from '../models/estadisticaGrupoFacturas';


@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  url:string = environment.url + "/api";

  factura$ : BehaviorSubject<Factura> = new BehaviorSubject<Factura>(null);
  
  constructor(private http: HttpClient) { 
    this.factura$.next(new Factura());
  }

  getFacturaObs(): Observable<Factura> {
    return this.factura$.asObservable();
  }  

  setFacturaObs(factura: Factura) {
    return this.factura$.next(factura);
  }

  getFacturasPag(pagina:number, paginaSize:number) {
    return this.http.get<any>(`${this.url}/facturas/usuario?page=${pagina}&size=${paginaSize}`);
  }

  getFacturasUsuarioYGrupoPag(pagina:number, paginaSize:number, idGrupo: number) {
    return this.http.get<any>(`${this.url}/facturas/usuario/grupo?idGrupo=${idGrupo}&page=${pagina}&size=${paginaSize}`);
  }

  nuevaFactura(factura: Factura) {
    return this.http.post<any>(`${this.url}/factura/nuevafactura`,factura);
  }

  deleteFactura(idFactura: number) {
    return this.http.get(`${this.url}/facturas/deleteFactura?idFactura=${idFactura}`);
  }

  getEstadisticasGruposFacturas() {
    return this.http.get<EstadisticaGrupoFacturas[]>(`${this.url}/facturas/usuario/grupo/estadisticas`);
  }

}
