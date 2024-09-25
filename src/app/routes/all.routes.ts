import { Routes } from "@angular/router";
import {ROUTES} from "./RoutesConst";
import { HomeComponent } from "./home/home.component";
import { GruposComponent } from "./grupos/grupos.component";
import { NuevoGrupoComponent } from "./grupos/nuevo-grupo/nuevo-grupo.component";
import { GrupoComponent } from "./grupos/grupo/grupo.component";
import { Grupo } from "../core/models/Grupo";
import { grupoResolver } from "../core/resolvers/grupo.resolver";

export const ALL_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'groups/newgroups', component: NuevoGrupoComponent},
    { path: 'groups/group/:id', component: GrupoComponent,
        resolve: {Grupo: grupoResolver}
    }
];
