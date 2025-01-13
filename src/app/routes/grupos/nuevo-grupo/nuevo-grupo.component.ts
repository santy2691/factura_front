import { Component } from '@angular/core';
import { Grupo } from '../../../core/models/Grupo';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GruposService } from '../../../core/services/grupos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOkComponent } from '../../../shared/component/modal-ok/modal-ok.component';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTES } from '../../RoutesConst';

@Component({
    selector: 'app-nuevo-grupo',
    imports: [ReactiveFormsModule, ModalOkComponent],
    templateUrl: './nuevo-grupo.component.html',
    styleUrl: './nuevo-grupo.component.css'
})
export class NuevoGrupoComponent {

  estaActivoModal: BehaviorSubject<boolean>;
  grupo: Grupo;
  grupoForm = new FormGroup({
    nombreGrupoForm: new FormControl('',Validators.required)
  });

  constructor(private grupServices: GruposService, private router: Router) {
    this.grupo = new Grupo();
    this.estaActivoModal = new BehaviorSubject<boolean>(false);
  }

  ngOnDestroy() {
    this.desactivarModal();
  }

  sumit(): void {
    if (this.grupoForm.valid) {
      this.grupServices.crearGrupo(this.grupo).subscribe({
        next : (grupoResp: Grupo)=> {
          this.activarModal();
        },
        error : (e: HttpErrorResponse) =>{
          console.log(e);
        }
      })
    }

  }

  activarModal() {
    this.estaActivoModal.next(true);
  }

  desactivarModal() {
    this.estaActivoModal.next(false);
  }

  cerrarModal() {
    this.desactivarModal();
    this.router.navigate([ROUTES.HOME]);
  }


}
