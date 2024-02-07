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
    const path = environment.apiURL + "view-pdf";
    return this.http.post(path, requestParamModel);
  }
}
