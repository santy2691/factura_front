import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRequest } from '../../../core/models/RegisterRequest';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../RoutesConst';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationResponseModel } from '../../../core/models/AuthenticationResponseModel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  data:RegisterRequest;
  registerForm = new FormGroup({
    nombreForm : new FormControl('',Validators.required),
    apellidoForm : new FormControl('',Validators.required),
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
    if (this.registerForm.valid) {
     this.auth.registrer(this.data).subscribe({
       next: (authenticationResponseModel: AuthenticationResponseModel) => {
        if (authenticationResponseModel.error && authenticationResponseModel.error != null) {
          alert(authenticationResponseModel.message);
        } else {
          localStorage.setItem('token', authenticationResponseModel.token);
          this.auth.updateUsuarioToken();
          this.router.navigate(['/home']);
        }
       },
       error: (error: HttpErrorResponse) => {
         alert(error.message);
       }
     });
    }
   
 }
}
