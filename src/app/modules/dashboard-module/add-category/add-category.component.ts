import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/shared/models/Category/category';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { CategoryService } from 'src/app/shared/services/Category/category.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Request } from 'src/app/shared/models/Request/request';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})


export class AddCategoryComponent implements OnInit {

  createCategoryForm!: FormGroup;
  categoryInfoModel = new Category();
  searchParamModel = new SearchParam();
  categoryList: Category[] = [];
  updateCategoryForm!: FormGroup;
  
  

  constructor(private fromBuilder: FormBuilder, private router: Router, private categoryService: CategoryService
              , private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    
    this.initCreateCategoryForm();
    this.initUpdateCategoryForm();
    this.loadCategoryList();
  }

  loadCategoryList() {

    this.searchParamModel.token = sessionStorage.getItem("authToken");

    this.categoryService.getCategoryList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        dataList.data[0].forEach((eachCategory: Category) => {
          const formatedDate = parseInt(eachCategory.createTime) * 1000;
          eachCategory.createTime = formatedDate.toString();

          this.categoryList.push(eachCategory);
        })
      }
    })
  }

  onSubmitAddCategoryForm() {
    
    const categoryName = this.createCategoryForm.controls['categoryName'].value;
    const status = this.createCategoryForm.controls['status'].value;
    const description = this.createCategoryForm.controls['description'].value;

    if (categoryName == "") {
      this.tostr.error("Empty Field Found", "Category Name is required.");
    } else if (status == "") {
      this.tostr.error("Empty Field Found", "Status is required.");
    } else if (description == "") {
      this.tostr.error("Empty Field Found", "Description is required.");
    } else {
      this.categoryInfoModel.token = sessionStorage.getItem("authToken");
      this.categoryInfoModel.categoryName = categoryName;
      this.categoryInfoModel.description = description;
      this.categoryInfoModel.status = status;

      this.spinner.show();
      this.categoryService.addCategory(this.categoryInfoModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Add New Category", "Category Added Successfully");
        } else {
          this.tostr.success("Add New Category", resp.message);
        } 

        this.spinner.hide();
      })
    }
  }

  initCreateCategoryForm() {
    this.createCategoryForm = this.fromBuilder.group({
      categoryName: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  initUpdateCategoryForm() {
    this.updateCategoryForm = this.fromBuilder.group({
      category_name: ['', Validators.required], 
      description: [''],
      category_id: [''],
      status: ['']
    });
  }

  onSubmitUpdateCategoryForm(){

    const categoryId = this.updateCategoryForm.controls['category_id'].value;
    const categoryName = this.updateCategoryForm.controls['category_name'].value;
    const status = this.updateCategoryForm.controls['status'].value;
    const description = this.updateCategoryForm.controls['description'].value;

    if (categoryName == "") {
      this.tostr.error("Empty Field Found", "Category Name is required.");
    } else if (status == "") {
      this.tostr.error("Empty Field Found", "Status is required.");
    } else if (description == "") {
      this.tostr.error("Empty Field Found", "Description is required.");
    } else {
      this.categoryInfoModel.token = sessionStorage.getItem("authToken");
      this.categoryInfoModel.id = categoryId;
      this.categoryInfoModel.categoryName = categoryName;
      this.categoryInfoModel.description = description;
      this.categoryInfoModel.status = status;

      this.spinner.show();
      this.categoryService.updateCategory(this.categoryInfoModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Add New Category", "Category Added Successfully");
          this.updateCategoryForm.reset();
          window.location.reload();
         
        } else {
          this.tostr.success("Add New Category", resp.message);
        } 

        this.spinner.hide();
      })
    }

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

onClickGetPCateInfo(Cid: string){
  this.searchParamModel.CategoryId = Cid;
  this.searchParamModel.token = sessionStorage.getItem("authToken");

  //this.productId = productId

  this.categoryService.EditCategory(this.searchParamModel).subscribe((resp: any) => {

    const dataList = JSON.parse(JSON.stringify(resp));

    if (resp.code === 1) {
      console.log('stusts',dataList.data[0]);
       this.updateCategoryForm.controls['category_name'].setValue(dataList.data[0].category_name);
       this.updateCategoryForm.controls['description'].setValue(dataList.data[0].description);
      this.updateCategoryForm.controls['category_id'].setValue(dataList.data[0].id);
       this.updateCategoryForm.controls['status'].setValue(dataList.data[0].status);

     
    }
  })
}

}
