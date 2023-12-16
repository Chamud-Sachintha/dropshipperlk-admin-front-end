import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchParam } from '../../models/SearchParam/search-param';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class KycService {

  constructor(private http: HttpClient) { }

  getAllKycList(searchParam: SearchParam) {
    const path = environment.apiURL + "get-kyc-list";
    return this.http.post(path, searchParam);
  }
}
