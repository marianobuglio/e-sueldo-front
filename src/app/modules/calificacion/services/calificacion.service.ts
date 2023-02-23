import { TableroCalificacion } from '../interfaces/calificacion';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private _board: BehaviorSubject<TableroCalificacion | null>;

  private enviroment = environment
  constructor(
    private _httpClient:HttpClient
  ) { 
    this._board = new BehaviorSubject(null);
  }

   /**
     * Getter for board
     */
   get board$(): Observable<TableroCalificacion>
   {
       return this._board.asObservable();
   }


   list():Observable<any>{
    return this._httpClient.get(`${this.enviroment.apiUrl}tableroevaluacions`).pipe(
      tap(
        (res)=>{
          console.log(res)
        }
      ),
      catchError(
        (err) => {
          throw new Error("Ocurrio un error al traer tableros");
        }
      )
    )
  }

  listById(id:string):Observable<TableroCalificacion>{
    return this._httpClient.get<TableroCalificacion>(`${this.enviroment.apiUrl}tableroevaluacions/${id}`).pipe(
      tap(board => this._board.next(board))
    )
  }

  update(tablero:TableroCalificacion,id:string):Observable<TableroCalificacion>{
    return this._httpClient.put<TableroCalificacion>(`${this.enviroment.apiUrl}tableroevaluacions/${id}`,tablero).pipe(
      tap(board => this._board.next(board))
  ); 
  }
  create(tablero:TableroCalificacion):Observable<TableroCalificacion>{
    return this._httpClient.post<TableroCalificacion>(`${this.enviroment.apiUrl}tableroevaluacions`,tablero).pipe(
      tap(board => this._board.next(board))
    );
  }

  updateNotification(logtablero:any){
    return this._httpClient.post(`${this.enviroment.apiUrl}logtablerosVistos`,logtablero)
  }
}
