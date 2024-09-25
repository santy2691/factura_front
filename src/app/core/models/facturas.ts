import { Grupo } from "./Grupo";
import { Usuario } from "./usuario";

export class Factura {
    id:number;
    descripcion:string;
    monto:number;
    fechaCreacion: Date;
    usuario: Usuario;
    idGrupo: number;
    grupo: Grupo;
    fechaFactura: Date;
}