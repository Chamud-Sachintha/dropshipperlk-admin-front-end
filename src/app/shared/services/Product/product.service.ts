import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/Product/product';
import { environment } from 'src/environments/environment.development';
import { Request } from '../../models/Request/request';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(productInfo: FormData) {
    const path = environment.apiURL + "add-product";
    return this.http.post(path, productInfo);
  }

  getProductList(requestParamModel: Request) {
    const path = environment.apiURL + "get-product-list";
    return this.http.post(path, requestParamModel);
  }

  updateProduct(productInfo: FormData) {
    const path = environment.apiURL + "update-product";
    return this.http.post(path, productInfo);
  }

  getProductInfoById(requestParamModel: Request) {
    const path = environment.apiURL + "get-product-info-by-id";
    return this.http.post(path, requestParamModel);
  }

  getProductDeleteById(requestParamModel: Request) {
    const path = environment.apiURL + "get-product-delete-by-id";
    return this.http.post(path, requestParamModel);
  }

  deleteProductImage(requestParamModel: Request) {
    const path = environment.apiURL + "get-product-image-delete-by-id";
    return this.http.post(path, requestParamModel);
  }
}
