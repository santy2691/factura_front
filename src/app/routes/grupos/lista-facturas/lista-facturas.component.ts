import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Factura } from '../../../core/models/facturas';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FacturasService } from '../../../core/services/facturas.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-lista-facturas',
    imports: [MatTableModule, MatPaginatorModule, MatCheckboxModule, CurrencyPipe, DatePipe],
    templateUrl: './lista-facturas.component.html',
    styleUrl: './lista-facturas.component.css'
})
export class ListaFacturasComponent {
  displayedColumns: string[] = ['select','position', 'monto','descripcion', 'fecha', 'otros'];
  @Input() facturas: Factura[];
  dataSource = new MatTableDataSource<Factura>();
  clickedRows = new Set<Factura>();
  selection = new SelectionModel<number>(true, []);

  @Input() totalFacturas:number;
  pageSize = 2;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() cambiarPagina: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() editarFacturaEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private facturaService:FacturasService){}

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "elementos por pagina:"
    this.dataSource.paginator = this.paginator;
    this.buscar();
  }

  buscar() {
    this.cambiarPagina.emit({pageIndex: this.paginator.pageIndex,pageSize: this.paginator.pageSize});
  }

  recargarTabla() {
    this.dataSource = new MatTableDataSource(this.facturas);
  }

  editarFactura(element: Factura) {
    this.facturaService.setFacturaObs(element);
    this.editarFacturaEvent.emit();
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

  eliminarFactura(element: Factura) {
    console.log("entra");
    this.facturaService.deleteFactura(element.id).subscribe({
      next : (resp)=>{
        console.log(resp);
        this.buscar();
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

}
