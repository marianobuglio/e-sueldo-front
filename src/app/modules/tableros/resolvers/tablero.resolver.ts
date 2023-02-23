import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Tablero } from '../interfaces/tablero';
import { TableroService } from '../services/tablero.service';

@Injectable({
  providedIn: 'root'
})
export class TableroResolver implements Resolve<Tablero> {
  constructor(
    private _tableroService:TableroService
  ){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tablero> {
   return this._tableroService.listById(route.paramMap.get('id')) 
  }
}
