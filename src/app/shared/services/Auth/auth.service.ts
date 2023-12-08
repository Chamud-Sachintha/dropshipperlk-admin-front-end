import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../../models/Auth/auth';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginAdminUser(authModel: Auth) {
    const path = environment.apiURL + "login";
    return this.http.post(path, authModel);
  }
}
