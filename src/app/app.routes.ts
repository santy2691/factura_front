import { Routes } from '@angular/router';
import { guardGuard } from './core/guard/guard.auth';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./routes/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./routes/all.routes').then(m => m.ALL_ROUTES),
        canActivate: [guardGuard]
    },
    {
        path: '**',
        loadComponent: ()=> import('./routes/error/not-found/not-found.component').then(m=>m.NotFoundComponent)
    }
];
