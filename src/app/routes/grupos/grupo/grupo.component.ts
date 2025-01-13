import { Component, ViewChild } from '@angular/core';
import { ListaFacturasComponent } from '../lista-facturas/lista-facturas.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter} from '@angular/material/core';
import{MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from "../../error/not-found/not-found.component";
import { NuevaFacturaComponent } from "../nueva-factura/nueva-factura.component";
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Grupo } from '../../../core/models/Grupo';
import { FacturasService } from '../../../core/services/facturas.service';
import { Factura } from '../../../core/models/facturas';


@Component({
    selector: 'app-grupo',
    providers: [{ provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }],
    imports: [ListaFacturasComponent, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule,
        MatCheckboxModule, NuevaFacturaComponent],
    templateUrl: './grupo.component.html',
    styleUrl: './grupo.component.css'
})
export class GrupoComponent {

  nombre:string = '';
  grupo: Grupo = new Grupo();
  grupo$: Observable<Grupo>;
  estaActivo: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
  @ViewChild(ListaFacturasComponent) listaFacturaComponent: ListaFacturasComponent;



  constructor(private activatedRoute: ActivatedRoute, private facturaService:FacturasService){
    this.grupo$ = this.activatedRoute.data.pipe(map((grupo) => grupo['Grupo']));
    this.grupo$.subscribe((grupo: Grupo)=>{
      this.grupo = grupo;
    })
  
  }

  ngOnInit(){
  }

  imprimir(){
    console.log(this.grupo)
  };

  activarModel() {
    this.estaActivo.next(true);
  }

  buscar(filtro: any) {
    this.getTableData$(filtro.pageIndex, filtro.pageSize, this.grupo.idGrupo).subscribe({
      next : (resp)=>{
        this.listaFacturaComponent.facturas = resp.content;
        this.listaFacturaComponent.totalFacturas = resp.totalElements;
        this.listaFacturaComponent.recargarTabla();
      }
    })
  }

  nuevaFactura() {
    this.buscar({pageIndex :this.listaFacturaComponent.paginator.pageIndex, pageSize:this.listaFacturaComponent.paginator.pageSize});
  }

  getTableData$(pageNumber: number, pageSize: number, idGrupo:number): Observable<any> {
    return this.facturaService.getFacturasUsuarioYGrupoPag(pageNumber, pageSize, idGrupo);
  }


}
