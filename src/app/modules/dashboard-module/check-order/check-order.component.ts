import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Product } from 'src/app/shared/models/Product/product';
import { Request } from 'src/app/shared/models/Request/request';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-check-order',
  templateUrl: './check-order.component.html',
  styleUrls: ['./check-order.component.css']
})
export class CheckOrderComponent implements OnInit {

  requestParamModel = new Request();
  productInfoModel = new Product();
  orderInfoModel = new OrderRequest();
  orderId!: string;
  isShowTrackingNumber = false;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.orderId = this.activatedRoute.snapshot.params['orderId'];

    this.loadOrderInfo();
  }

  onClickUpdatePayStatus(paymentStatus: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.paymentStatus = paymentStatus;

    this.orderService.updatePaymentStatusOfOrder(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        
      }
    })
  }

  onClickViewBankSlip(bankSlip: string) {
    const filePath = environment.fileServerBack + "images/" + bankSlip;
    window.open(filePath)
  }

  onChangeStatus(orderStatus: string) {
    if (orderStatus == "4") {
      this.isShowTrackingNumber = true;
    } else {
      this.isShowTrackingNumber = false;
    }
  }

  loadOrderInfo() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.orderId = this.orderId;

    this.orderService.getOrderInfoByOd(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        this.orderInfoModel.productName = dataList.data[0].productName;
        this.orderInfoModel.totalAmount = dataList.data[0].totalAmount;
        this.orderInfoModel.quantity = dataList.data[0].quantity;
        this.orderInfoModel.bankSlip = dataList.data[0].bankSlip;
        this.orderInfoModel.paymentMethod = dataList.data[0].paymentMethod;
      }
    })
  }

}
