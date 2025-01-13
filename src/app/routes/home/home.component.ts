import { Component } from '@angular/core';
import { ROUTES } from '../RoutesConst';
import { Grupo } from '../../core/models/Grupo';
import { GruposService } from '../../core/services/grupos.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

  grupos: Grupo[];
  rutas = {
    nuevogrupo: ROUTES.NEW_GROUPS
  };

  constructor(private grupoService: GruposService) {

  }

  ngOnInit():void {
    this.grupoService.getGrupoUsuarioToken().subscribe({
      next : (gruposResp: Grupo[])=> {
        this.grupos = gruposResp;
      },
      error : (e: HttpErrorResponse) =>{
        console.log(e);
      }
    });
  }
  

}
