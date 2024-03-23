import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../../models/Request/request';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(private http: HttpClient) { }

  viewPdf(requestParamModel: Request) {
    const url =  environment.apiURL +'view-pdf';
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(url, requestParamModel, { headers, responseType: 'blob', observe: 'response' });
  
  }

  DownOrderRepport(requestParamModel: Request) {
    const path = environment.apiURL + "DownloadExcel";
    return this.http.post(path, requestParamModel, { responseType: 'blob' }); 
  }
}
