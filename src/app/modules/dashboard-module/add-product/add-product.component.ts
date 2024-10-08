import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})


export class AddProductComponent implements OnInit, OnDestroy {

 

  createProfuctForm!: FormGroup;
  updateProductForm!: FormGroup;
  selectedImageFile: File[] = [];
  UpdatedImages: { [key: string]: File } = {};
  searchParamModel = new SearchParam();
  requestParamModel = new Request();
  categoryList: Category[] = [];
  productInfoList: Product[] = [];
  productModel = new Product;
  productId!: string;
  descriptionEditor: any
  searchText = '';
  filteredProductList: Product[] = [];
  Uimage!: string; 
  Uimages: string[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 100;

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService
            , private categoryService: CategoryService
            , private tosr: ToastrService
            , private spinner: NgxSpinnerService) {}

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.initCreateProductForm();
    this.initUpdateProductForm();
    this.loadCategoryList();
    this.loadProductList();
    this.filteredProductList = this.productInfoList;
    
   
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    // this.loadProductList();
  }

  onClickGetProductInfo(productId: string) {
    this.requestParamModel.productId = productId;
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.Uimages =[];
    this.productId = productId

    this.productService.getProductInfoById(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.updateProductForm.controls['productName'].setValue(dataList.data[0].productName);
        this.updateProductForm.controls['description'].setValue(dataList.data[0].description);
        this.updateProductForm.controls['price'].setValue(dataList.data[0].price);
        this.updateProductForm.controls['status'].setValue(dataList.data[0].status);
        this.updateProductForm.controls['stockcount'].setValue(dataList.data[0].stockCount);

        const images = dataList.data[0].image;
       
        for (let key in images) {
          if (images.hasOwnProperty(key)) {
            const thumbnail = environment.devServer + "images/" + images[key];
            this.Uimages.push(thumbnail);
          }
        }
      }
    })
  }

  onSubmitUpdateProductForm() {
    const productName = this.updateProductForm.controls['productName'].value;
    const description = this.updateProductForm.controls['description'].value;
    const price = this.updateProductForm.controls['price'].value;
    const status = this.updateProductForm.controls['status'].value;
    const stockCount = this.updateProductForm.controls['stockcount'].value;
   
    console.log("updated image",this.UpdatedImages);
    if (productName == "") {
      this.tosr.error("Empty Field Found", "Product Name is Required.");
    } else if (description == "") {
      this.tosr.error("Empty Field Found", "Description is Required.");
    } else if (price == "") {
      this.tosr.error("Empty Field Found", "Price is Required.");
    } else {
      const formData = new FormData();

      const token: any = sessionStorage.getItem("authToken");

      formData.append("token", token);
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description",description);
      formData.append("stockCount", stockCount);
      formData.append("status", status);
      formData.append("productId", this.productId);

      this.selectedImageFile.forEach((eachImage: File, index) => {
        formData.append("image" + index, eachImage);
      })

     /* this.productModel.token = sessionStorage.getItem("authToken");
      this.productModel.productName = productName;
      this.productModel.description = description;
      this.productModel.price = price;
      this.productModel.productId = this.productId;
      this.productModel.status = status;*/
  
      this.productService.updateProduct(formData).subscribe((resp: any) => {
        if (resp.code === 1) {
         // console.log("Successfully Updated Product Info!",resp.code);
          this.tosr.success("Update Product", "Product Updated Successfully.");
          // window.location.reload();
        } else {
          this.tosr.error("Update Product", resp.message);
        }
      })
    }
  }

  initUpdateProductForm() {
    this.updateProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      status: [''],
      stockcount: ['']
    })
  }
  

  loadProductList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");

    this.spinner.show();
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

      this.spinner.hide();
    })
  }

  loadCategoryList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");

    this.spinner.show();
    this.categoryService.getCategoryList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachCategory: Category) => {
          this.categoryList.push(eachCategory);
        })
      }

      this.spinner.hide();
    })
  }

  onSubmitCreateProductAddForm() {
    
    const descriptionControl = this.createProfuctForm.get('description');

  if (descriptionControl) {
    const descriptionValue = descriptionControl.value;
    this.descriptionEditor = descriptionControl.value;
    // Now you can send 'descriptionValue' to your backend API to save it in the database
    console.log(descriptionValue);
  } else {
    console.error("Description control is null");
  }
   const productName = this.createProfuctForm.controls['productName'].value;
    const price = this.createProfuctForm.controls['price'].value;
    const category = this.createProfuctForm.controls['category'].value;
    const teamCommision = this.createProfuctForm.controls['teamCommision'].value;
    const directCommision = this.createProfuctForm.controls['directCommision'].value;
    const isStorePick = this.createProfuctForm.controls['isStorePick'].value;
    const weight = this.createProfuctForm.controls['weight'].value;
    const warranty = this.createProfuctForm.controls['warranty'].value;
   // const description = this.createProfuctForm.controls['description'].value;
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
      formData.append("description", this.descriptionEditor);
      formData.append("supplierName", supplierName);
      formData.append("stockCount", stockCount);

      this.selectedImageFile.forEach((eachImage: File, index) => {
        formData.append("image" + index, eachImage);
      })
     // console.log(formData);
      this.spinner.show();
      this.productService.addProduct(formData).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tosr.success("Add New Product", "Product Added Successully");
          window.location.reload();
        } else {
          this.tosr.error("Add New Prodyct", resp.message)
        }
      })
    // } 
  }

  onChangeImageFileUpload($event: any) {
    this.selectedImageFile = Array.from($event.target.files);

    this.selectedImageFile.forEach((eachImage: File, index) => {
      console.log("image" + index, eachImage);
    })

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
  
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
};

filterOrderRequestList() {
  if (!this.searchText) {
    this.filteredProductList = this.productInfoList; // Reset to the original data if search text is empty
  } else {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredProductList = this.productInfoList.filter(order =>
      Object.values(order).some(value =>
        value ? value.toString().toLowerCase().includes(searchTextLower) : false
      )
    );
  }
}

onClickGetProductDelete(productId: string){
  this.requestParamModel.productId = productId;
  this.requestParamModel.token = sessionStorage.getItem("authToken");

  this.productId = productId

  this.productService.getProductDeleteById(this.requestParamModel).subscribe((resp: any) => {

    const dataList = JSON.parse(JSON.stringify(resp));

    if (resp.code === 1) {
      this.initCreateProductForm();
    this.initUpdateProductForm();
    this.loadCategoryList();
    this.loadProductList();
    this.filteredProductList = this.productInfoList;
      this.tosr.success("Deleted Product", "Product Delete Successully");
    } else {
      this.tosr.error("Delete Prodyct", resp.message)
    }
  })
}

getImageName(image: string): string | null {
  const imageName = image.split('/').pop();
  return imageName ? imageName : null;
}

deleteImage(imageName: string | null) {
  this.Uimages = this.Uimages.filter(image => this.getImageName(image) !== imageName);
  console.error('Failed to delete image',imageName);
  // Call the backend to delete the image
  this.requestParamModel.productId = this.productId;
  this.requestParamModel.imageId = imageName;
  this.requestParamModel.token = sessionStorage.getItem("authToken");

  this.productService.deleteProductImage(this.requestParamModel).subscribe((resp: any) => {
    if (resp.code === 1) {
     
      this.tosr.success("Deleted Product", "Product Image Delete Successully");
      console.log('Image deleted successfully');
    } else {
      this.tosr.error("Delete Prodyct", resp.message)
      console.error('Failed to delete image');
    }
  });
}

}
