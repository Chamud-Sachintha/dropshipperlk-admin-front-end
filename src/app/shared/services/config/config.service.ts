import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../models/Config/config';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  addNewConfig(configModel: Config) {
    const path = environment.apiURL + "add-config";
    return this.http.post(path, configModel);
  }

  findConfigByName(configModel: Config) {
    const path = environment.apiURL + "get-config-by-name";
    return this.http.post(path, configModel);
  }
}
