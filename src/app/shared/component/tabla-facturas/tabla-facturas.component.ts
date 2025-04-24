import { Component, input, OnInit, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Factura } from '../../../core/models/facturas';
import { CurrencyPipe } from '@angular/common';
import { MomentPipe } from '../../../core/pipes/moment.pipe';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FacturasService } from '../../../core/services/facturas.service';

@Component({
  selector: 'app-tabla-facturas',
  imports: [TableModule, CurrencyPipe, MomentPipe, ButtonModule, InputTextModule],
  templateUrl: './tabla-facturas.component.html',
  styleUrl: './tabla-facturas.component.css'
})
export class TablaFacturasComponent implements OnInit {
  facturas = input<Factura[]>();
  isDelete = input<boolean>(true);
  isClick = input<boolean>(true);
  eliminar = output<number>();

  constructor(private facturaService: FacturasService){}

  ngOnInit() {
    console.log(this.facturas());
  }

  eliminarFactura(factura: Factura) { 
    this.eliminar.emit(factura.id);
  }

  editarFactura(factura: Factura) {
    // Implement the logic to edit the invoice
    console.log('Editar factura:', factura);
  }

}
