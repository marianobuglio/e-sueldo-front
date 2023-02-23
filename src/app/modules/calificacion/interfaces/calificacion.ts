import { User } from "app/core/user/user.types"
import { Columna, Log } from "app/modules/tableros/interfaces/tablero"

export interface TableroCalificacion{
     
    _id:string
    name:string,
      listas:Array<Columna>
      integrantes:Array<User>,
      tipo:{
        tipo:String,
        codigo:Number
      },
      tipoIncidencia:string,
      tipoNovedad:string,
      created:Date,
      plantillaTablero:any,
      user:User,
      empresa:string,
      color:String,
      logs:Array<any>,
      tokensTopic:Array<String>,
      log:Array<Log>,
      padre:Boolean,
      tableroPadre:string,
      periodo:Date,
}