import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FacturasService } from '../../../core/services/facturas.service';
import { catchError, map, startWith, switchMap, } from 'rxjs';
import { Factura } from '../../../core/models/facturas';



@Component({
  selector: 'app-grupo',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {
  displayedColumns: string[] = ['position', 'monto','descripcion'];
  facturas: Factura[];
  dataSource = new MatTableDataSource<Factura>();
  clickedRows = new Set<Factura>();

  totalFacturas:number;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private facturaService:FacturasService){

  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "elementos por pagina:"
    this.dataSource.paginator = this.paginator;
    this.paginator.page.pipe(
      startWith({}),
      switchMap(()=>{
        return this.getTableData$(this.paginator.pageIndex,this.paginator.pageSize)
      }),
      map((data)=>{
        console.log(data)
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

  getTableData$(pageNumber: number, pageSize: number) {
    return this.facturaService.getFacturasPag(pageNumber, pageSize);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalFacturas = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

}
