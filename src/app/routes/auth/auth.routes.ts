import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import {ROUTES} from "../RoutesConst";

export const AUTH_ROUTES: Routes = [
    { path: `${ROUTES.REGISTER}`, component: RegisterComponent },
    { path: `${ROUTES.LOGIN}`, component: LoginComponent },
    //{ path: `${ROUTES.HOME}`, component: null}
    { path: '',   redirectTo: `${ROUTES.LOGIN}`, pathMatch: 'full' }
];