import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { tipoLiqui } from '../interface/tipoLiquidacion';
@Injectable({
  providedIn: 'root'
})
export class TipoLiquidacionService {
  private environment = environment
  constructor(
    private _httpClient: HttpClient
  ) { }

  list(){
    return this._httpClient.get<Array<tipoLiqui>>(`${this.environment.apiUrl}tiposrecibos`)
  }
}
