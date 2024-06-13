import { Component } from '@angular/core';
import { TuiButtonModule, TuiNotificationComponent, TuiNotificationModule, TuiRootModule } from '@taiga-ui/core';
import {
  TUI_PASSWORD_TEXTS,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  tuiInputPasswordOptionsProvider,
} from '@taiga-ui/kit';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {TuiErrorModule} from '@taiga-ui/core';
import {
  TUI_INPUT_PASSWORD_OPTIONS,
  TUI_INPUT_PASSWORD_DEFAULT_OPTIONS,
} from '@taiga-ui/kit';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TuiValidationError } from '@taiga-ui/cdk';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../RoutesConst';
import { RegisterRequest } from '../../../core/models/RegisterRequest';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationResponseModel } from '../../../core/models/AuthenticationResponseModel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TuiRootModule, TuiInputModule, TuiInputPasswordModule, 
    ReactiveFormsModule,TuiButtonModule, TuiErrorModule, 
    TuiFieldErrorPipeModule, CommonModule, TuiNotificationModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    tuiInputPasswordOptionsProvider({
      icons: {
        hide: 'tuiIconEyeOff',
        show: 'tuiIconEye',
      },
    }),
    {
      provide: TUI_PASSWORD_TEXTS,
      useValue: of(['']),
    },
  ],
})
export class LoginComponent {

  tuiErrorPassword: string | null = null;
  tuiErrorEmail:string | null = null;
  data: RegisterRequest;
  error:string| null;
  loginForm = new FormGroup({
    emailForm: new FormControl('',[Validators.required,Validators.email]),
    passwordForm: new FormControl('',Validators.required)
  });

  constructor(private auth: AuthService, private router: Router) {
    if (auth.isAuth()) {
      router.navigate([`/${ROUTES.HOME}`]);
    }
    this.data = new RegisterRequest();
  }
  

  submit() {
     this.tuiErrorEmail = this.validateEmailTUI();
     this.tuiErrorPassword = this.validatePasswordTUI();
     if (this.loginForm.valid) {
      this.auth.Login(this.data).subscribe({
        next: (authenticationResponseModel: AuthenticationResponseModel) => {
          localStorage.setItem('token', authenticationResponseModel.token);
          this.auth.updateUsuarioToken();
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.error.message;
        }
      });
     }
    
  }

  onClose() {
    this.error = null;
  }


  validateEmailTUI() {
    let tuiError = null;
    let errores = this.loginForm.controls.emailForm.errors;
    if (errores){
      if (errores['required']) {
        tuiError ='el email es obligatorio';
      } else if (errores['email']) {
        tuiError ='el email no es valido';
      } 
    }
    return tuiError;
  }

  validatePasswordTUI() {
    let tuiError = null;
    let errores = this.loginForm.controls.passwordForm.errors;
    if (errores) {
      if (errores['required']) {
        tuiError = 'la contraseña es obligatoria';
      }
    }
    return tuiError;
  }


}
