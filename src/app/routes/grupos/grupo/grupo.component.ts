import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter} from '@angular/material/core';
import{MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { NuevaFacturaComponent } from "../nueva-factura/nueva-factura.component";
import { BehaviorSubject, Observable, combineLatest, forkJoin, map, merge, startWith, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Grupo } from '../../../core/models/Grupo';
import { FacturasService } from '../../../core/services/facturas.service';
import { CardModule } from 'primeng/card';
import { TablaFacturasComponent } from "../../../shared/component/tabla-facturas/tabla-facturas.component";
import { Factura } from '../../../core/models/facturas';
import { PaginatorModule } from 'primeng/paginator';


@Component({
    selector: 'app-grupo',
    providers: [{ provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }],
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule,
    MatCheckboxModule, NuevaFacturaComponent, CardModule, TablaFacturasComponent, PaginatorModule],
    templateUrl: './grupo.component.html',
    styleUrl: './grupo.component.css'
})
export class GrupoComponent implements OnInit {

  nombre:string = '';
  grupo: Grupo = new Grupo();
  grupo$: Observable<Grupo>;
  estaActivo: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);

  facturas: Factura[] = [];
  numeroPaginas: number = 0;
  totalFacturas: number = 0;
  changePag_ = new BehaviorSubject<number>(0);
  changePag$: Observable<number>;


  constructor(private activatedRoute: ActivatedRoute, private facturaService:FacturasService){
    this.grupo$ = this.activatedRoute.data.pipe(map((grupo) => grupo['Grupo']));
    this.grupo$.subscribe((grupo: Grupo)=>{
      this.grupo = grupo;
    });

    this.changePag$ = this.changePag_.asObservable();
  }

  ngOnInit(){
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur(); // Remove focus from the button
    combineLatest([
      this.changePag$
    ]).pipe(
      startWith(0),
      switchMap(()=>{
        return this.facturaService.getFacturasUsuarioYGrupoPag(this.changePag_.value, 5, this.grupo.idGrupo);
      })
    ).subscribe({
      next: (resp: any)=>{
        this.facturas = resp.content;
        this.numeroPaginas = resp.totalPage;
        this.totalFacturas = resp.totalElements;
      }
    })
  }


  activarModel() {
    this.estaActivo.next(true);
  }
  eliminarFactura(id: number) {
    this.facturaService.deleteFactura(id).subscribe({
      next: (resp: Factura) => {    
        this.changePag_.next(this.changePag_.value);
      },
      error: (error: any) => {
        console.log(error);
      }   
    });
  }

  editarFactura() {
    console.log("editar factura");
    this.activarModel();
  }

  nuevaFactura() {
    this.changePag_.next(this.changePag_.value);
    //this.buscar({pageIndex :this.listaFacturaComponent.paginator.pageIndex, pageSize:this.listaFacturaComponent.paginator.pageSize});
  }

  onPageChange(event: any) {
    this.changePag_.next(event.page);
  }

}
