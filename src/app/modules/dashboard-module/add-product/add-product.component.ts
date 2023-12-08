import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  createProfuctForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initCreateProductForm();
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
      stockCount: ['', Validators.required]
    })
  }

}
