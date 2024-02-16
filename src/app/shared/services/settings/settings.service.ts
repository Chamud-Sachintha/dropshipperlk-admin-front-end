import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SiteBanner } from '../../models/SiteBanner/site-banner';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  addSiteBanner(bannerInfo: SiteBanner) {
    const path = environment.apiURL + "add-site-banner";
    return this.http.post(path, bannerInfo);
  }
}
