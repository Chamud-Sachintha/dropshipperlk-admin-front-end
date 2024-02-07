import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/shared/models/Category/category';
import { Product } from 'src/app/shared/models/Product/product';
import { Request } from 'src/app/shared/models/Request/request';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { CategoryService } from 'src/app/shared/services/Category/category.service';
import { ProductService } from 'src/app/shared/services/Product/product.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  createProfuctForm!: FormGroup;
  selectedImageFile: File[] = [];
  searchParamModel = new SearchParam();
  requestParamModel = new Request();
  categoryList: Category[] = [];
  productInfoList: Product[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService
            , private categoryService: CategoryService
            , private tosr: ToastrService
            , private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initCreateProductForm();
    this.loadCategoryList();
    this.loadProductList();
  }

  loadProductList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");

    this.productService.getProductList(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachData: Product) => {
          const formatedDate = parseInt(eachData.createTime) * 1000;
          const thumbnail = environment.devServer + "images/" + eachData.image;

          eachData.image = thumbnail;
          eachData.createTime = formatedDate.toString();
          this.productInfoList.push(eachData);
        })
      }
    })
  }

  loadCategoryList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");

    this.categoryService.getCategoryList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachCategory: Category) => {
          this.categoryList.push(eachCategory);
        })
      }
    })
  }

  onSubmitCreateProductAddForm() {
    const productName = this.createProfuctForm.controls['productName'].value;
    const price = this.createProfuctForm.controls['price'].value;
    const category = this.createProfuctForm.controls['category'].value;
    const teamCommision = this.createProfuctForm.controls['teamCommision'].value;
    const directCommision = this.createProfuctForm.controls['directCommision'].value;
    const isStorePick = this.createProfuctForm.controls['isStorePick'].value;
    const weight = this.createProfuctForm.controls['weight'].value;
    const warranty = this.createProfuctForm.controls['warranty'].value;
    const description = this.createProfuctForm.controls['description'].value;
    const supplierName = this.createProfuctForm.controls['supplierName'].value;
    const stockCount = this.createProfuctForm.controls['stockCount'].value;
    const images = this.selectedImageFile;

    // if (productName == "") {

    // } else if (price == "") {

    // } else if (teamCommision == "") {

    // } else if (directCommision == "") {

    // } else if (isStorePick == "") {

    // } else if (weight == "") {

    // } else if (warranty == "") {

    // } else if (description == "") {

    // } else if (supplierName == "") {

    // } else if (stockCount == "") {

    // } else if (this.selectedImageFile.length == 0) {

    // } else {
      const formData = new FormData();

      const token: any = sessionStorage.getItem("authToken");

      formData.append("token", token);
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("teamCommision", teamCommision);
      formData.append("directCommision", directCommision);
      formData.append("isStorePick", isStorePick);
      formData.append("weight", weight);
      formData.append("warranty", warranty);
      formData.append("description", description);
      formData.append("supplierName", supplierName);
      formData.append("stockCount", stockCount);

      this.selectedImageFile.forEach((eachImage: File, index) => {
        formData.append("image" + index, eachImage);
      })

      this.spinner.show();
      this.productService.addProduct(formData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tosr.success("Add New Product", "Product Added Successully");
        } else {
          this.tosr.error("Add New Prodyct", resp.message)
        }
      })
    // }
  }

  onChangeImageFileUpload($event: any) {
    this.selectedImageFile = Array.from($event.target.files);

  }

  initCreateProductForm() {
    this.createProfuctForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      teamCommision: ['', Validators.required],
      directCommision: ['', Validators.required],
      isStorePick: ['', Validators.required],
      weight: ['', Validators.required],
      warranty: ['', Validators.required],
      description: ['', Validators.required],
      supplierName: ['', Validators.required],
      stockCount: ['', Validators.required],
      images: ['', Validators.required]
    })
  }

}
