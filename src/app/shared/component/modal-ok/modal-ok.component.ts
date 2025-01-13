import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

declare var window: any;

@Component({
    selector: 'app-modal-ok',
    imports: [],
    templateUrl: './modal-ok.component.html',
    styleUrl: './modal-ok.component.css'
})
export class ModalOkComponent {

  formModal: any;
  @Input() isActive : BehaviorSubject<boolean>;
  @Input() mensaje : string;
  @Output() 
  darClick: EventEmitter<any> = new EventEmitter<any>();
  isActiveObs: Observable<boolean>;

  ngOnInit(): void {
    this.isActiveObs = this.isActive.asObservable(); 
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );
    this.isActiveObs?.subscribe(activo => {
      if(activo) {
        this.formModal?.show();
      } else {
        this.formModal?.hide();
      }    
    })
  }

  cerrar():void {
    this.darClick.emit();
  }

}
