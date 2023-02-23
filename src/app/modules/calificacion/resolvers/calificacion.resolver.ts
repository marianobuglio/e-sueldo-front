import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TableroCalificacion } from '../interfaces/calificacion';
import { CalificacionService } from '../services/calificacion.service';

@Injectable({
  providedIn: 'root'
})
export class CalificacionResolver implements Resolve<TableroCalificacion> {
  constructor(
    private _tableroService:CalificacionService
  ){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TableroCalificacion> {
   return this._tableroService.listById(route.paramMap.get('id')) 
  }
}
