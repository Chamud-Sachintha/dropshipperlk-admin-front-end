import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Request } from '../../models/Request/request';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  constructor(private http: HttpClient) { }

  getCourierPackageList(requestParamModel: Request) {
    const path = environment.apiURL + "";
    return this.http.post(path, requestParamModel);
  }
}
