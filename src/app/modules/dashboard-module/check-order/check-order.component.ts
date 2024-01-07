import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/Product/product';
import { Request } from 'src/app/shared/models/Request/request';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-check-order',
  templateUrl: './check-order.component.html',
  styleUrls: ['./check-order.component.css']
})
export class CheckOrderComponent implements OnInit {

  requestParamModel = new Request();
  productInfoModel = new Product();
  orderId!: string;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.orderId = this.activatedRoute.snapshot.params['orderId'];

    this.loadOrderInfo();
  }

  loadOrderInfo() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.orderId = this.orderId;

    this.orderService.getOrderInfoByOd(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        this.productInfoModel.productName = dataList.data[0].productName;
      }
    })
  }

}
