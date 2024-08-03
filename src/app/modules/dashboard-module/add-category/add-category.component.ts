import { Component, OnInit } from '@angular/core';
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
  fillteredcategoryList: Category[] = [];
  updateCategoryForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  searchText = '';

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 100;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private categoryService: CategoryService,
    private toastr: ToastrService, 
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initCreateCategoryForm();
    this.initUpdateCategoryForm();
    this.loadCategoryList();
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    // this.loadCategoryList();
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set image preview URL
      };
      reader.readAsDataURL(file);
    }
  }

  loadCategoryList(): void {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    
    this.spinner.show();
    this.categoryService.getCategoryList(this.searchParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.categoryList = resp.data[0].map((eachCategory: Category) => {
          eachCategory.createTime = (parseInt(eachCategory.createTime) * 1000).toString();
          return eachCategory;
        });
        this.fillteredcategoryList = this.categoryList; // Initialize filtered list
      }

      this.spinner.hide();
    });
  }

  filterOrderRequestList() {
    if (!this.searchText) {
      this.fillteredcategoryList = this.categoryList; 
    } else {
      const searchTextLower = this.searchText.toLowerCase();
      this.fillteredcategoryList = this.categoryList.filter(Category =>
        Object.values(Category).some(value =>
          value ? value.toString().toLowerCase().includes(searchTextLower) : false
        )
      );
    }
  }

  onSubmitAddCategoryForm(): void {
    if (this.createCategoryForm.invalid) {
      this.toastr.error("Empty Field Found", "All fields are required.");
      return;
    }

    this.categoryInfoModel.token = sessionStorage.getItem("authToken");
    this.categoryInfoModel = this.createCategoryForm.value;
    console.log(this.categoryInfoModel);
    this.spinner.show();
    this.categoryService.addCategory(this.categoryInfoModel).subscribe((resp: any) => {
      this.spinner.hide();
      if (resp.code === 1) {
        this.toastr.success("Category Added Successfully", "Add New Category");
        this.createCategoryForm.reset();
        this.loadCategoryList();
      } else {
        this.toastr.error(resp.message, "Add New Category");
      }
    });
  }

  initCreateCategoryForm(): void {
    this.createCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  initUpdateCategoryForm(): void {
    this.updateCategoryForm = this.formBuilder.group({
      category_id: [''],
      category_name: ['', Validators.required],
      description: [''],
      status: ['']
    });
  }

  onSubmitUpdateCategoryForm(): void {
    if (this.updateCategoryForm.invalid) {
      this.toastr.error("Empty Field Found", "All fields are required.");
      return;
    }

    this.categoryInfoModel.token = sessionStorage.getItem("authToken");
    this.categoryInfoModel = this.updateCategoryForm.value;

    this.spinner.show();
    this.categoryService.updateCategory(this.categoryInfoModel).subscribe((resp: any) => {
      this.spinner.hide();
      if (resp.code === 1) {
        this.toastr.success("Category Updated Successfully", "Update Category");
        this.updateCategoryForm.reset();
        this.loadCategoryList();
      } else {
        this.toastr.error(resp.message, "Update Category");
      }
    });
  }

  onClickGetPCateInfo(Cid: string): void {
    this.searchParamModel.CategoryId = Cid;
    this.searchParamModel.token = sessionStorage.getItem("authToken");

    this.categoryService.EditCategory(this.searchParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        const data = resp.data[0];
        this.updateCategoryForm.patchValue({
          category_id: data.id,
          category_name: data.category_name,
          description: data.description,
          status: data.status
        });
      }
    });
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
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      { name: 'quote', class: 'quote' },
      { name: 'redText', class: 'redText' },
      { name: 'titleText', class: 'titleText', tag: 'h1' },
    ]
  };
}
