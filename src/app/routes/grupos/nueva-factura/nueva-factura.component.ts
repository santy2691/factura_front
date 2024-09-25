import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Factura } from '../../../core/models/facturas';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FacturasService } from '../../../core/services/facturas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Grupo } from '../../../core/models/Grupo';

declare var window: any;

@Component({
  selector: 'app-nueva-factura',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nueva-factura.component.html',
  styleUrl: './nueva-factura.component.css'
})
export class NuevaFacturaComponent implements OnInit{

  formModal: any;
  @Input() isActive : BehaviorSubject<boolean>;
  @Input() grupo: Grupo;
  isActiveObs: Observable<boolean>;
  factura: Factura = new Factura();
  facturaForm: FormGroup;

  constructor(private facturaService: FacturasService) {}

  ngOnInit(): void {
    this.factura.grupo = this.grupo;
    this.factura.idGrupo = this.grupo != null ? this.grupo.idGrupo : null;
    this.isActiveObs = this.isActive.asObservable(); 
    this.facturaForm = new FormGroup({
      descripcionForm: new FormControl('',Validators.required),
      montoForm: new FormControl('',Validators.required),
      fechaForm: new FormControl('',Validators.required)
    });

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('staticBackdrop')
    );
    this.isActiveObs?.subscribe(activo => {
      if(activo) {
        this.formModal?.show();
      } else {
        this.formModal?.hide();
      }    
    })
  }

  /**
   * metodo que regresa la fecha maxima de permitida del imput fecha de factura 
   * @returns string con la fecha minima
   */
  getMinDate() {
    let fecha = new Date();
    fecha.setFullYear(fecha.getFullYear() -1);
    return fecha.toISOString().slice(0,10);
  }


  /**
   * metodo que regresa la fecha maxima permitidas 
   * @returns string con la fecha maxima aceptada 
   */
  getMAxDate() {
    return new Date().toISOString().slice(0,10);
  }


  /**
   * metodo para guardar una factura
   */
  guardarFactura() {
    if (this.facturaForm.valid) {
      this.facturaService.nuevaFactura(this.factura).subscribe({
        next : (facturaCreada: Factura)=> {
          this.facturaForm.reset();
          this.factura = new Factura();
          this.formModal.hide();
        },
        error : (e: HttpErrorResponse) =>{
          console.log(e);
        }
      });
    } else {
      alert("no es valida");
    }

  }
}
