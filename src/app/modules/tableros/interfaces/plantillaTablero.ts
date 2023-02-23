export interface ListaTareas {
    name: String,
    esPlantilla:boolean,
    tareas:Array<any>
}
export interface plantillaTablero {
    name:string,
    ListaTareas:Array<ListaTareas>,
    tipo:string,
    _id:string
}


export interface plantillaTableroGeneral{
    _id:string
    name:string,
    listas:Array<any>,
    plantillaTarjeta:null,
    tipo:string
}