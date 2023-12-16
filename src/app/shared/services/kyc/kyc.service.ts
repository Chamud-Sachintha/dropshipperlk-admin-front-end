import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchParam } from '../../models/SearchParam/search-param';
import { environment } from 'src/environments/environment.development';
import { Request } from '../../models/Request/request';

@Injectable({
  providedIn: 'root'
})
export class KycService {

  constructor(private http: HttpClient) { }

  getAllKycList(searchParam: SearchParam) {
    const path = environment.apiURL + "get-kyc-list";
    return this.http.post(path, searchParam);
  }

  updateKyc(requestParam: Request) {
    const path = environment.apiURL + "update-kyc";
    return this.http.post(path, requestParam);
  }
}
