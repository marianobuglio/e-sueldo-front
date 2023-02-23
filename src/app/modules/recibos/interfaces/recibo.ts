import { User } from "app/core/user/user.types";

export interface Recibo {
    selected: boolean;
    created:Date,
    empleado:User,
    empresa:Object,
    firmadoEmpleado:{
        firmado:Boolean
    }
    firmadoEmpleador:{
        firmado:Boolean
    }
    idLiquidacion:number,
    pdf:string,
    periodo:Date,
    tipoRecibo:Object,
    _id:string
}