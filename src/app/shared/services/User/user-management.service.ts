import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Request } from '../../models/Request/request';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }

  getReseller(requestParam: Request) {
    const path = environment.apiURL + "get-all-ResellerUser";
    return this.http.post(path, requestParam);
  }

  getResetPass(requestParam: Request) {
    const path = environment.apiURL + "set-resetpass-ResellerUser";
    return this.http.post(path, requestParam);
  }
}
