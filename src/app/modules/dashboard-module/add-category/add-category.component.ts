import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  createCategoryForm!: FormGroup;

  constructor(private fromBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initCreateCategoryForm();
  }

  initCreateCategoryForm() {
    this.createCategoryForm = this.fromBuilder.group({
      categoryName: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

}
