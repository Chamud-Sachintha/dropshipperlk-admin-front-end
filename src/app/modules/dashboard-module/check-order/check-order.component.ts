import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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
  orderRequestList: OrderRequest[] = [];
  orderId!: string;
  isShowTrackingNumber = false;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute
              , private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {

    this.orderId = this.activatedRoute.snapshot.params['orderId'];
console.log('orddrid',this.orderId);
    this.loadOrderInfo();
  }

  onClickRefundApprove(paymentStatus: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.orderId = this.orderId;
    this.requestParamModel.paymentStatus = paymentStatus;

    this.spinner.show();
    this.orderService.refundApprove(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Approve Refund", "Approve Refund Siccessfully");
        location.reload();
      } else {
        this.tostr.error("Approve Refund", resp.message);
      }

      this.spinner.hide();
    })
  }

  onClickSetTrackingNumber(trackingNumber: string, courierName: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.orderId = this.orderId;
    this.requestParamModel.trackingNumber = trackingNumber;
    this.requestParamModel.courierName = courierName;
    console.log('set Tracking Number : ', this.requestParamModel);
    this.spinner.show();
    this.orderService.setTrackingNumberOfOrder(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Set Tracking Number", "Tracking Number Updated Successfully");
        location.reload();
      } else {
        this.tostr.error("Set Tracking Number", resp.message);
      }

      this.spinner.hide();
    })
  }

  onClickUpdateOrderStatus(orderStatus: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.orderId = this.orderId;
    this.requestParamModel.orderStatus = orderStatus;

    this.spinner.show();
    this.orderService.updateOrderStatusOfOrder(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Update Order Status", "Order Status Updated Successfully");
        location.reload();
      } else {
        this.tostr.error("Update Order Statuys", resp.message);
      }

      this.spinner.hide();
    })
  }

  onClickUpdatePayStatus(paymentStatus: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.paymentStatus = paymentStatus;
    this.requestParamModel.orderId = this.orderId;

    this.spinner.show();
    this.orderService.updatePaymentStatusOfOrder(this.requestParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Update Payment Sdatus", "Payment Status Updated Successfully");
        location.reload();
      } else {
        this.tostr.error("Update Payment Status", resp.message);
      }

      this.spinner.hide();
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

        dataList.data.forEach((eachData: OrderRequest, index: any) => {
          const dataObj: any = eachData;
          this.orderRequestList.push(dataObj[index]);
        })
        // this.orderInfoModel.productName = dataList.data[0].productName;
        this.orderInfoModel.totalAmount = dataList.data[0].totalAmount;
        // this.orderInfoModel.quantity = dataList.data[0].quantity;
        this.orderInfoModel.bankSlip = dataList.data[0].bankSlip;
        this.orderInfoModel.paymentMethod = dataList.data[0].paymentMethod;
        this.orderInfoModel.paymentStatus = dataList.data[0].paymentStatus;
        this.orderInfoModel.orderStatus = dataList.data[0].orderStatus;
        this.orderInfoModel.orderCancled = dataList.data[0].orderCancled;
        this.orderInfoModel.refundNotice = dataList.data[0].refundNotice;
       // this.orderInfoModel.trackingNumber = dataList.data[0].trackingNumber;
       // this.orderInfoModel.courierName = dataList.data[0].courierName;
        // this.orderInfoModel.image1 = environment.devServer + "images/" + dataList.data[0].images.image0;
        // this.orderInfoModel.image2 = environment.devServer + "images/" + dataList.data[0].images.image1;
        // this.orderInfoModel.image3 = environment.devServer + "images/" + dataList.data[0].images.image2;
        // this.orderInfoModel.image4 = environment.devServer + "images/" + dataList.data[0].images.image3;
      }
    })
  }

}
