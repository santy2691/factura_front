import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Factura } from '../../../core/models/facturas';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FacturasService } from '../../../core/services/facturas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Grupo } from '../../../core/models/Grupo';
import { DatePipe } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';

declare var window: any;

@Component({
    selector: 'app-nueva-factura',
    imports: [ReactiveFormsModule,DatePickerModule],
    templateUrl: './nueva-factura.component.html',
    styleUrl: './nueva-factura.component.css'
})
export class NuevaFacturaComponent implements OnInit, OnDestroy{

  formModal: any;
  @Input() isActive : BehaviorSubject<boolean>;
  @Input() grupo: Grupo;
  @Output() eventoFacturaGuradad: EventEmitter<Factura> = new EventEmitter<Factura>();
  isActiveObs: Observable<boolean>;
  factura: Factura = new Factura();
  facturaForm: FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(private facturaService: FacturasService) {
    this.facturaService.getFacturaObs().subscribe({
      next: (factura: Factura)=>{
        this.factura = factura;
        this.initForm(this.factura)
      }
    })
  }

  ngOnInit(): void {
    this.maxDate = this.getMAxDate();
    this.minDate = this.getMinDate();
    this.isActiveObs = this.isActive.asObservable(); 
    this.initForm(this.factura);

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

  initForm(factura: any) {
    if (!this.factura.id) {
      this.factura.grupo = this.grupo;
      this.factura.idGrupo = this.grupo != null ? this.grupo.idGrupo : null;
    }
    let fecha: Date = factura.fechaFactura != null ? new Date(factura.fechaFactura) : null;
    this.facturaForm = new FormGroup({
      descripcionForm: new FormControl(factura.descripcion,Validators.required),
      montoForm: new FormControl(factura.monto,Validators.required),
      fechaForm: new FormControl(fecha,Validators.required)
    });
  }

  ngOnDestroy(): void {
     
  }

  /**
   * metodo que regresa la fecha maxima de permitida del imput fecha de factura 
   * @returns string con la fecha minima
   */
  getMinDate() {
    let fecha = new Date();
    fecha.setFullYear(fecha.getFullYear() -1);
    return fecha;
  }


  /**
   * metodo que regresa la fecha maxima permitidas 
   * @returns string con la fecha maxima aceptada 
   */
  getMAxDate() {
    return new Date();
  }


  /**
   * metodo para guardar una factura
   */
  guardarFactura() {
    if (this.facturaForm.valid) {
      let factura = this.crearFactura();
      this.facturaService.nuevaFactura(factura).subscribe({
        next : (facturaCreada: Factura)=> {
          this.facturaForm.reset();
          this.facturaService.setFacturaObs(new Factura());
          this.eventoFacturaGuradad.emit(facturaCreada);
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

  crearFactura() {
    let factura: Factura = new Factura();
    factura.id = this.factura.id;
    factura.idGrupo = this.factura.idGrupo;
    factura.descripcion = this.facturaForm.get('descripcionForm').value;
    factura.monto = this.facturaForm.get('montoForm').value;
    factura.fechaFactura = new Date(this.facturaForm.get('fechaForm').value);
    return factura;
  }

  cerrarModal() {
    this.facturaService.setFacturaObs(new Factura());
  }
}
