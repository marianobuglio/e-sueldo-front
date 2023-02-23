import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { Tablero } from '../interfaces/tablero';
import { plantillaTablero, plantillaTableroGeneral } from '../interfaces/plantillaTablero';
@Injectable({
  providedIn: 'root'
})
export class PlantillaService {
  private enviroment = environment
  constructor(
    private _httpClient:HttpClient
  ) { }

  create(plantilla :plantillaTablero):Observable<plantillaTablero>
  {
    return this._httpClient.post<plantillaTablero>(`${this.enviroment.apiUrl}plantillatareas`,plantilla)
  }
  createTablero(plantilla: plantillaTableroGeneral):Observable<plantillaTableroGeneral>
  {
    return this._httpClient.post<plantillaTableroGeneral>(`${this.enviroment.apiUrl}plantillatableros`,plantilla)
  }
  list():Observable<Array<plantillaTablero>>
  {
    return this._httpClient.get<Array<plantillaTablero>>(`${this.enviroment.apiUrl}plantillatareas`)
  }
  listPlantillaGeneral():Observable<Array<plantillaTableroGeneral>>
  {
    return this._httpClient.get<Array<plantillaTableroGeneral>>(`${this.enviroment.apiUrl}plantillatableros`)
  }
}
