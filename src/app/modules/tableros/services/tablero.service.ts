import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { Tablero } from '../interfaces/tablero';
import { create } from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class TableroService {
  private _board: BehaviorSubject<Tablero | null>;

  private enviroment = environment
  constructor(
    private _httpClient:HttpClient
  ) { 
    this._board = new BehaviorSubject(null);
  }


    /**
     * Getter for board
     */
    get board$(): Observable<Tablero>
    {
        return this._board.asObservable();
    }
    
  list():Observable<any>{
    return this._httpClient.get(`${this.enviroment.apiUrl}tasks`).pipe(
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

  listById(id:string):Observable<Tablero>{
    return this._httpClient.get<Tablero>(`${this.enviroment.apiUrl}tasks/${id}`).pipe(
      tap(board => this._board.next(board))
    )
  }

  update(tablero:Tablero,id:string):Observable<Tablero>{
    return this._httpClient.put<Tablero>(`${this.enviroment.apiUrl}tasks/${id}`,tablero).pipe(
      tap(board => this._board.next(board))
  ); 
  }
  create(tablero:Tablero):Observable<Tablero>{
    return this._httpClient.post<Tablero>(`${this.enviroment.apiUrl}tasks`,tablero).pipe(
      tap(board => this._board.next(board))
    );
  }

  updateNotification(logtablero:any){
    return this._httpClient.post(`${this.enviroment.apiUrl}logtablerosVistos`,logtablero)
  }
}
