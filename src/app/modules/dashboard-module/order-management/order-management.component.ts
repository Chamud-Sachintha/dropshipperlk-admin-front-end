import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Request } from 'src/app/shared/models/Request/request';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { PrintService } from 'src/app/shared/services/print/print.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  requestParamModel = new Request();
  orderRequestList: OrderRequest[] = [];
  selectedOrdersToPrint = 0;
  selectedOrderNumbers: any[] = [];
  searchText = '';

  constructor(private orderService: OrderService, private route: Router, private printService: PrintService) {}

  ngOnInit(): void {
    this.loadOrderRequestList();
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

}
