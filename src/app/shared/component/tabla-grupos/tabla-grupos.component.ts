import { Component, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Grupo } from '../../../core/models/Grupo';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-tabla-grupos',
  imports: [TableModule, ButtonModule,InputTextModule],
  templateUrl: './tabla-grupos.component.html',
  styleUrl: './tabla-grupos.component.css'
})
export class TablaGruposComponent {

  grupos= input<Grupo[]>();
  clickFlecha = output<number>();

  submit(idGrupo: number) {
    this.clickFlecha.emit(idGrupo)
  }

}
