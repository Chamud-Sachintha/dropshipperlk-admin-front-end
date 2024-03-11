import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Request } from 'src/app/shared/models/Request/request';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { PrintService } from 'src/app/shared/services/print/print.service';

interface CustomerDetails {
  order: string;
  name: string ;
  contact_1: string;
  contact_2: string;
  address: string;
}

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})



export class OrderManagementComponent implements OnInit {

  requestParamModel = new Request();
  reqwustOrderCusDetails: any = {};
  orderRequestList: OrderRequest[] = [];
  selectedOrdersToPrint = 0;
  selectedOrderNumbers: any[] = [];
  searchText = '';
  CustomerForm! : FormGroup;
  OrderCusDetails: CustomerDetails | null = null;
  

  constructor(private orderService: OrderService, private route: Router, private printService: PrintService, private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadOrderRequestList();
    this.CustomerForm = this.fb.group({
      order:['', Validators.required],
      name: ['', Validators.required],
      contact_1: ['', Validators.required],
      contact_2: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onClickPrintWayBillPdf() {
    this.requestParamModel.orderNumbers = this.selectedOrderNumbers;
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    
    this.printService.viewPdf(this.requestParamModel).subscribe((resp: any) => {

      
    })
  }

  removeOrderNumber(orderNumber: string) {
    const index = this.selectedOrderNumbers.indexOf(orderNumber);
    if (index > -1) { // only splice array when item is found
      this.selectedOrderNumbers.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  onClickSelectToPrint(index: number, orderNumber: string) {
    const formatedIndex = index.toString();
    const getDivIndex: any = document.getElementById(formatedIndex);
    const getSelectedDivIndex: any = document.getElementById("s" + formatedIndex);

    getSelectedDivIndex.style.display = "none";
    getDivIndex.style.display = "";

    this.selectedOrdersToPrint += 1;
    this.selectedOrderNumbers.push(orderNumber);
  }

  onClickRemoveSelected(index: number, orderNumber: string) {
    const formatedIndex = index.toString();
    const getDivIndex: any = document.getElementById(formatedIndex);
    const getSelectedDivIndex: any = document.getElementById("s" + formatedIndex);

    getSelectedDivIndex.style.display = "";
    getDivIndex.style.display = "none";

    this.selectedOrdersToPrint -= 1;
    this.removeOrderNumber(orderNumber);
  }
  
  onClickViewOrder(orderId: string) {
    this.route.navigate(['app/check-order', orderId]);
  }

  loadOrderRequestList() {

    this.requestParamModel.token = sessionStorage.getItem("authToken");

    this.orderService.getOrderRequestList(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachOrder: OrderRequest) => {
          this.orderRequestList.push(eachOrder);
        })
      }
    })
  }

  onClickLoadModel(orderId: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.Oid = orderId;
  
    this.orderService.getOrderCustomerData(this.requestParamModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));
  
      if (resp.code === 1 && resp.data && resp.data.length > 0) {
        this.OrderCusDetails = resp.data[0]!;
        console.log("asd", this.OrderCusDetails);
  
        if (this.OrderCusDetails) {
         
          this.CustomerForm.patchValue({
            order: this.OrderCusDetails.order || '',
            name: this.OrderCusDetails.name || '',
            contact_1: this.OrderCusDetails.contact_1 || '',
            contact_2: this.OrderCusDetails.contact_2 || '',
            address: this.OrderCusDetails.address || '',
          });
        }
      }
    });
  }
  

  onSubmitAddQuantityForm(){
    this.reqwustOrderCusDetails.token = sessionStorage.getItem("authToken");
    this.reqwustOrderCusDetails.order = this.CustomerForm.value.order;
    this.reqwustOrderCusDetails.contact_1 = this.CustomerForm.value.contact_1;
    this.reqwustOrderCusDetails.contact_2 = this.CustomerForm.value.contact_2;
    this.reqwustOrderCusDetails.address = this.CustomerForm.value.address;

    this.orderService.UpdateCusdata(this.reqwustOrderCusDetails).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.toastr.success('Operation Complete', 'Success');
        window.location.reload();
      }
    })
      console.log('Form submitted:', this.reqwustOrderCusDetails);
  }
}
