import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourierPackage } from 'src/app/shared/models/CourierPackage/courier-package';
import { Request } from 'src/app/shared/models/Request/request';
import { CourierService } from 'src/app/shared/services/courier/courier.service';

@Component({
  selector: 'app-courier-info',
  templateUrl: './courier-info.component.html',
  styleUrls: ['./courier-info.component.css']
})
export class CourierInfoComponent implements OnInit {

  requestParamModel = new Request();
  courierPAckageInfoModel = new CourierPackage();
  packageListArray: CourierPackage[] = [];
  orderStatusChangeForm!: FormGroup;
  selectedOrderNumber!: any;

  constructor(private courierService: CourierService, private tostr: ToastrService, private formBuilder: FormBuilder
              , private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getCourierPackageList();
    this.initOrderStatusChangeForm();
  }

  setSelectedOrder(orderNumber: any) {
    this.selectedOrderNumber = orderNumber;
  }

  onSubmitOrderStatusChange() {
    const orderStatus = this.orderStatusChangeForm.controls['orderStatus'].value;

    if (orderStatus == "") {
      this.tostr.error("Please Select Order Status", "Change Order Status");
    } else {
      this.requestParamModel.token = sessionStorage.getItem("authToken");
      this.requestParamModel.orderNumber = this.selectedOrderNumber;
      this.requestParamModel.orderStatus = orderStatus;

      this.courierService.updateCourierStatus(this.requestParamModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.tostr.success("Order Status Changes Successfully.", "Change Order Status");
        } else {
          this.tostr.error(resp.message, "Order Status Change");
        }
      })
    }
  }

  initOrderStatusChangeForm() {
    this.orderStatusChangeForm = this.formBuilder.group({
      orderStatus: ['', Validators.required]
    })
  }

  onClickCreatePackage(orderNumber: string, wayBillNo: string) {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.orderNumber = orderNumber;
    this.requestParamModel.wayBillNumber = wayBillNo;

    this.courierService.createCourierPackage(this.requestParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.tostr.success("Package Created Successfully", "Courier Package Create.");
      } else {
        this.tostr.error(resp.message, "Courier Package Create.");
      }
    })
  }

  getCourierPackageList() {
    this.requestParamModel.token = localStorage.getItem("authToken");

    this.spinner.show();
    this.courierService.getCourierPackageList(this.requestParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));

        dataList.data[0].forEach((el: CourierPackage) => {
          const formatedDate = parseInt(el.createTime) * 1000;
          el.createTime = formatedDate.toString();

          this.packageListArray.push(el);
        })
      }

      this.spinner.hide();
    })
  }

}
