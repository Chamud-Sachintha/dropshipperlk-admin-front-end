import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/Category/category';
import { environment } from 'src/environments/environment.development';
import { SearchParam } from '../../models/SearchParam/search-param';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(categoryInfo: Category) {
    const path = environment.apiURL + "add-category";
    return this.http.post(path, categoryInfo);
  }

  EditCategory(searchParam: SearchParam) {
    const path = environment.apiURL + "find-category";
    return this.http.post(path, searchParam);
  }

  updateCategory(categoryInfo: Category) {
    const path = environment.apiURL + "update-category";
    return this.http.post(path, categoryInfo);
  }

  getCategoryList(searchParam: SearchParam) {
    const path = environment.apiURL + "get-category-list";
    return this.http.post(path, searchParam);
  }
}
