import { Component } from '@angular/core';
import {
  TuiAvatarComponent,
  TuiAvatarModule,
  tuiAvatarOptionsProvider,
} from '@taiga-ui/kit';
import { Usuario } from '../../../core/models/usuario';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../../routes/RoutesConst';

@Component({
    selector: 'app-navegation',
    imports: [TuiAvatarModule],
    templateUrl: './navegation.component.html',
    styleUrl: './navegation.component.css',
    providers: [
        tuiAvatarOptionsProvider({
            size: 's',
            autoColor: true,
            rounded: true,
        }),
    ]
})
export class NavegationComponent {
  usuario: Usuario;
  estaLogeado: boolean = false;

  constructor(private auth: AuthService, private router: Router) {
    auth.isAuthObs().subscribe((logeado: boolean) => {
      this.estaLogeado = logeado;
    });

    auth.getUsuarioOBs().subscribe((user: Usuario) => {
      this.usuario = user;
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate([`/${ROUTES.LOGIN}`]);
  }
}
