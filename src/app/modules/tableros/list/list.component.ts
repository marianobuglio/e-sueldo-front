import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { CreateComponent } from '../create/create.component';
import { Tablero } from '../interfaces/tablero';
import { TableroService } from '../services/tablero.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tableros: Array<Tablero>
  constructor(
    private _tableroService:TableroService,
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
        console.log("tableros",this.tableros)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  openCreateDialog(){
    this._matDialog.open(CreateComponent, {
      data:{},
      panelClass:['w-full','md:w-240', 'max-w-none']
    })
    .afterClosed()
    .subscribe((tarjeta) => {
     
    });
  }

  goTablero(id:string){
    debugger
    this._router.navigate([`/tableros/${id}`])
  }


  notificacionVistas(logs){
    logs.map(function(log){
      log.visto = new Date()
    })

    this._tableroService.updateNotification(logs).subscribe()
    // TasksServiceNotificacion.create({'logtablero':logs}).$promise.then(function(result){
    //   console.log(results)
    // })
  }
}
