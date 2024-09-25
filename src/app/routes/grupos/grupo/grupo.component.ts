import { Component } from '@angular/core';
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


@Component({
  selector: 'app-grupo',
  standalone: true,
  providers: [{provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}],
  imports: [ListaFacturasComponent, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, 
    MatCheckboxModule, NotFoundComponent, NuevaFacturaComponent,AsyncPipe ],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {

  nombre:string = '';
  grupo: Grupo = new Grupo();
  grupo$: Observable<Grupo>;
  estaActivo: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);



  constructor( private activatedRoute: ActivatedRoute){
  }

  ngOnInit(){
    this.grupo$ = this.activatedRoute.data.pipe(map((grupo) => grupo['Grupo']));
    this.grupo$.subscribe((grupo: Grupo)=>{
      this.grupo = grupo;
    })
  }

  imprimir(){
    console.log(this.grupo)
  };

  activarModel() {
    this.estaActivo.next(true);
  }


}
