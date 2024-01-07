import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../../models/Request/request';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrderRequestList(requestParamModel: Request) {
    const path = environment.apiURL + "get-order-requests";
    return this.http.post(path, requestParamModel);
  }

  getOrderInfoByOd(requestParamModel: Request) {
    const path = environment.apiURL + "get-order-info-by-id";
    return this.http.post(path, requestParamModel);
  }
}
