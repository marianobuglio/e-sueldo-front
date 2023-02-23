import { Recibo } from "./recibo";

export interface RecibosToSend{
    recibos: Array<Recibo>,
    empleador: Boolean,
    motivo: string,
    certPassword: string,
    fecha:string
  };