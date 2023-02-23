import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { TableroCalificacion } from '../interfaces/calificacion';
import { ListPeriodoComponent } from '../list-periodo/list-periodo.component';
import { CalificacionService } from '../services/calificacion.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tableros: Array<TableroCalificacion>
  tablerosPadres: Array<TableroCalificacion>;
  constructor(
    private _tableroService:CalificacionService,
    private _matDialog : MatDialog,
    private _router: Router

  ){

  }
  ngOnInit(): void {
    this.getTableros()
  }

  getTableros(){
    this._tableroService.list()
    .subscribe(
      (res)=>{
        this.tableros = res
        this.filtrarTableroPadre()
        console.log("tableros",this.tableros)
      },
      (err) => {
        console.log(err)
      }
    )
  }
  filtrarTableroPadre(){
    this.tablerosPadres = this.tableros.filter((t) => {
      if(t.padre){
        return t
      }
    })
  }
  openPeriodos(tablero){
   const dialogRef = this._matDialog.open(ListPeriodoComponent,{
      data:{
        tableroPadre:tablero,
        tablerosSeleccionados:this.filtrarTablerosHijos(tablero)
      }
    })
    
  }

  filtrarTablerosHijos(tableroPadre: TableroCalificacion): Array<TableroCalificacion>{
    const tablerosSeleccionados = this.tableros.filter((tablero) => {
      if( !tablero.padre && tablero.tableroPadre.toString() == tableroPadre._id.toString()){
        return tablero
      }else if(tablero.padre && tablero._id.toString() == tableroPadre._id.toString() ){
        return tablero
      }
    })

    return tablerosSeleccionados
  }

  // openCreateDialog(){
  //   this._matDialog.open(CreateComponent, {
  //     data:{},
  //     panelClass:['w-full','md:w-240', 'max-w-none']
  //   })
  //   .afterClosed()
  //   .subscribe((tarjeta) => {
     
  //   });
  // }

  goTablero(id:string){
    debugger
    this._router.navigate([`/calificacion/${id}`])
  }


  // notificacionVistas(logs){
  //   logs.map(function(log){
  //     log.visto = new Date()
  //   })

  //   this._tableroService.updateNotification(logs).subscribe()
  //   // TasksServiceNotificacion.create({'logtablero':logs}).$promise.then(function(result){
  //   //   console.log(results)
  //   // })
  // }
}
