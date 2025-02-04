import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Factura } from '../../../core/models/facturas';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MomentPipe } from '../../../core/pipes/moment.pipe';

@Component({
  selector: 'app-tabla-facturas',
  imports: [TableModule, CurrencyPipe, MomentPipe],
  templateUrl: './tabla-facturas.component.html',
  styleUrl: './tabla-facturas.component.css'
})
export class TablaFacturasComponent {
  facturas = input<Factura[]>();

  constructor(){}

}
