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

  updatePaymentStatusOfOrder(requestParamModel: Request) {
    const path = environment.apiURL + "update-pay-status";
    return this.http.post(path, requestParamModel);
  }

  updateOrderStatusOfOrder(requestParamModel: Request) {
    const path = environment.apiURL + "update-order_status";
    return this.http.post(path, requestParamModel);
  }

  setTrackingNumberOfOrder(requestParamModel: Request) {
    const path = environment.apiURL + "set-tracking-number";
    return this.http.post(path, requestParamModel);
  }

  refundApprove(requestParamModel: Request) {
    const path = environment.apiURL + "refund-approve";
    return this.http.post(path, requestParamModel);
  }

  getOrderCustomerData(requestParamModel: Request){
    const path = environment.apiURL + "get-order-info-by-Cus";
    return this.http.post(path, requestParamModel);
  }

  UpdateCusdata(reqwustOrderCusDetails: Request){
    const path = environment.apiURL + "Update-order-info-by-Cus";
    return this.http.post(path, reqwustOrderCusDetails);
  }

  returnStatusUpdate(requestParamModel: Request){
    const path = environment.apiURL + "update-return-status";
    return this.http.post(path, requestParamModel);
  }

  bulkOrderUpdate() {
    const path = environment.apiURL + "bulk-order-update";
  }
}
