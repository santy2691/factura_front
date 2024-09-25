import { Component, Input, ViewChild } from '@angular/core';
import { Factura } from '../../../core/models/facturas';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Observable, map, startWith, switchMap } from 'rxjs';
import { FacturasService } from '../../../core/services/facturas.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NumberInput } from '@angular/cdk/coercion';
import { PaginacionNumerosComponent } from '../../../shared/component/paginacion-numeros/paginacion-numeros.component';

@Component({
  selector: 'app-lista-facturas',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatCheckboxModule, PaginacionNumerosComponent],
  templateUrl: './lista-facturas.component.html',
  styleUrl: './lista-facturas.component.css'
})
export class ListaFacturasComponent {
  displayedColumns: string[] = ['select','position', 'monto','descripcion'];
  facturas: Factura[];
  dataSource = new MatTableDataSource<Factura>();
  clickedRows = new Set<Factura>();
  selection = new SelectionModel<number>(true, []);

  totalFacturas:number;
  pageSize = 2;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @Input() idGrupo: number;

  constructor(private facturaService:FacturasService){}

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "elementos por pagina:"
    this.dataSource.paginator = this.paginator;
    this.paginator.page.pipe(
      startWith({}),
      switchMap(()=>{
        return this.getTableData$(this.paginator.pageIndex,this.paginator.pageSize, this.idGrupo)
      }),
      map((data)=>{
        if (data == null) return null
        this.totalFacturas = data.totalElements
        return data.content;
      })
    ).subscribe((resp:Factura[])=>{
      console.log(resp);
      this.facturas = resp;
      this.dataSource =new MatTableDataSource(this.facturas);
    })
    
  }

  getTableData$(pageNumber: number, pageSize: number, idGrupo:number): Observable<any> {
    return this.facturaService.getFacturasUsuarioYGrupoPag(pageNumber, pageSize, idGrupo);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalFacturas = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  isAllSelected() {
    let numSelected = 0; 
    this.dataSource.data.forEach((data)=>{
      if (this.selection.selected.some((elemento)=> elemento == data.id)) numSelected++;
    });
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.dataSource.data.forEach(row => this.selection.deselect(row.id)) :
        this.dataSource.data.forEach(row => this.selection.select(row.id));
  }

}
