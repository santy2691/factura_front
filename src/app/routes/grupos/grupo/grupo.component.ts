import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FacturasService } from '../../../core/services/facturas.service';
import { ListaFacturasComponent } from '../lista-facturas/lista-facturas.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter} from '@angular/material/core';
import{MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-grupo',
  standalone: true,
  providers: [{provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}],
  imports: [ ListaFacturasComponent, MatFormFieldModule, MatInputModule, MatDatepickerModule,FormsModule, MatCheckboxModule],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {

  nombre:string;



  constructor(private facturaService:FacturasService){
  }

  imprimir(){
    console.log(this.nombre)
  };


}
