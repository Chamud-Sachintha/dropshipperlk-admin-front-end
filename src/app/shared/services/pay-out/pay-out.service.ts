import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../../models/Request/request';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PayOutService {

  constructor(private http: HttpClient) { }

  getSellerList(requestParamModel: Request) {
    const path = environment.apiURL + "get-seller-list";
    return this.http.post(path, requestParamModel);
  }

  getPayOutInfo(requestParamModel: Request) {
    const path = environment.apiURL + "get-payout-info";
    return this.http.post(path, requestParamModel);
  }

  releasePayOut(requestParamModel: Request) {
    const path = environment.apiURL + "pay-out";
    return this.http.post(path, requestParamModel);
  }

  getPayOutSummeryInfo(requestParamModel: Request) {
    const path = environment.apiURL + "get-payout-summery";
    return this.http.post(path, requestParamModel);
  }
}
