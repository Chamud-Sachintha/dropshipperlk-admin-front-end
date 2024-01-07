import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Request } from 'src/app/shared/models/Request/request';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  requestParamModel = new Request();
  orderRequestList: OrderRequest[] = [];

  constructor(private orderService: OrderService, private route: Router) {}

  ngOnInit(): void {
    this.loadOrderRequestList();
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
