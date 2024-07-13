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
    const path = environment.apiURL + "get-courier-package-list";
    return this.http.post(path, requestParamModel);
  }

  createCourierPackage(requestParamModel: Request) {
    const path = environment.apiURL + "create-package";
    return this.http.post(path, requestParamModel);
  }

  updateCourierStatus(requestModel: Request) {
    const path = environment.apiURL + "update-courier-status";
    return this.http.post(path, requestModel);
  }
}
