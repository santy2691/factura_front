import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { GruposService } from "../services/grupos.service";
import { Grupo } from "../models/Grupo";

export const grupoResolver: ResolveFn<Grupo> = (route, state) => {
    const idGrupo = route.paramMap.get('id');
    return  inject(GruposService).getGrupoPorId(idGrupo); //inject(GameService).getById(gameId)
}