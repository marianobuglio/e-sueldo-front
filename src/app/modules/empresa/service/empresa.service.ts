import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  api:any
  constructor(
    private _httpClient: HttpClient,
   
  ) {
    this.api = environment
   }

  list(): Observable<any>
  {
      return this._httpClient.get<any[]>(`${this.api.apiUrl}empresas`)
  }

  create(empresa: any): Observable<any>
  {
      return this._httpClient.post<any>(`${this.api.apiUrl}empresascreate/activate`, empresa)
  }

  delete(id:string) : Observable<any>
  {
    return this._httpClient.delete<any>(`${this.api.apiUrl}empresas/${id}`)

  }
}
