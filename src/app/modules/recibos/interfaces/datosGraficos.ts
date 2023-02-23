export interface GraficoGeneral {
    anio:string,
    mes:string,
    data:Array<{
      name:string,
      y:number,
      cantidad:number
    }>
}