import { tipoLiqui } from "app/modules/tipoLiquidacion/interface/tipoLiquidacion";

export interface uploadRecibo{ 
    urlPdf: string,
    periodo: string,
    tipo:tipoLiqui,
    fileManager: boolean   
}