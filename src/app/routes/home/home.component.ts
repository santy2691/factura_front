import { Component } from '@angular/core';
import { ROUTES } from '../RoutesConst';
import { Grupo } from '../../core/models/Grupo';
import { GruposService } from '../../core/services/grupos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TablaFacturasComponent } from "../../shared/component/tabla-facturas/tabla-facturas.component";
import { Factura } from '../../core/models/facturas';
import { FacturasService } from '../../core/services/facturas.service';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { GraficoComponent } from '../../shared/component/grafico/grafico.component';
import { TablaGruposComponent } from "../../shared/component/tabla-grupos/tabla-grupos.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [ CardModule, CardModule, GraficoComponent, TablaGruposComponent, TablaGruposComponent, PanelModule, MenuModule, ButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

  grupos: Grupo[] = [];
  facturas : Factura[] = [];
  rutas = {
    nuevogrupo: ROUTES.NEW_GROUPS
  };

  constructor(private grupoService: GruposService, private facturasServices : FacturasService, private router: Router) {}

  ngOnInit():void {
    this.grupoService.getGrupoUsuarioToken().subscribe({
      next : (gruposResp: Grupo[])=> {
        this.grupos = gruposResp;
      },
      error : (e: HttpErrorResponse) =>{
        console.log(e);
      }
    });

    this.facturasServices.getFacturasPag(0,5).subscribe({
      next: (resp)=>{
        this.facturas = resp.content;
      },
      error : (e: HttpErrorResponse) =>{
        console.log(e);
      }
    });

    this.grupoService.getGrupoUsuarioToken().subscribe({
      next:(resp) => {
        if (resp) {
          this.grupos = resp;
        }
      },
      error : (e: HttpErrorResponse) =>{
        console.log(e);
      }
    })
  }

  nuevoGrupo() {
    this.router.navigateByUrl(this.rutas.nuevogrupo);
  }

  irAGrupo(idGrupo: number) {
    this.router.navigateByUrl(`groups/group/${idGrupo}`);
  }
}
