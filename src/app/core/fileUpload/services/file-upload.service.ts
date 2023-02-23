import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  enviroment = environment
  constructor(
    private _httpClient:HttpClient,
    
    ) { }

  upload(formData:FormData){
    return this._httpClient.post(`${this.enviroment.apiUrl}uploads`,formData,{
      reportProgress: true,
      observe: 'events'
  })
  }
}
