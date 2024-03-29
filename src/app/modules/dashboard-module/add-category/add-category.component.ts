import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/shared/models/Category/category';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { CategoryService } from 'src/app/shared/services/Category/category.service';

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

  constructor(private fromBuilder: FormBuilder, private router: Router, private categoryService: CategoryService
              , private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initCreateCategoryForm();
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

}
