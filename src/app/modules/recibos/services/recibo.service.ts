import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { RecibosToSend } from '../interfaces/recibosToSend';
import { uploadRecibo } from '../interfaces/uploadRecibos';
@Injectable({
  providedIn: 'root'
})
export class ReciboService {
  environment: { apiUrl: string; production: boolean; };

  constructor(
    private _httpClient: HttpClient
  ) { 
    this.environment = environment
  }

  list(periodo:string):Observable<any>
  {
    return this._httpClient.get<any>(`${this.environment.apiUrl}recibosEmpresaEmpleado/00/${periodo}/anual`)
  }

  listUser(periodo:string):Observable<any>
  {
    return this._httpClient.get<any>(`${this.environment.apiUrl}recibosByEmpleado/${periodo}`)
  }

  signPdf(recibosToSend : RecibosToSend){
    return this._httpClient.post<any>(`${this.environment.apiUrl}signPDFService`,recibosToSend)
  }
  uploadPdf(uploadRecibo:uploadRecibo){
    return this._httpClient.post<any>(`${this.environment.apiUrl}uploadRecibos/fromPDF`,uploadRecibo)
  }
}
