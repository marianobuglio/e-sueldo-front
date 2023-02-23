import { User } from "app/core/user/user.types"


export interface Log {
    tablero: string,
    mensaje : string,
    userNotificacion: string,
    user: string
}
export interface Comentario {
    comentario:String,
    usuario:User
}
export interface Tarjeta{
    adjuntos?:Array<string>,
    description?:string,
    ListaTareas?:Array<any>,
    plantillaTarea?:any,
    tickets?:any
    novedades?:any
    created?:Date
    integrantes?:Array<User>,
    prioridad?:{nombre:string},
    descripcion?:string,
    comentarios?:Array<Comentario>,
    legajo?:User
}
export interface Columna{
    _id?:string
    name:string,
    tasks:Array<Tarjeta>
}
export interface Tablero{
     
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
      log:Array<Log>
}