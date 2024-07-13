import { Component, OnInit } from '@angular/core';
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

  constructor(private courierService: CourierService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.getCourierPackageList();
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
    this.courierService.getCourierPackageList(this.requestParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp.data));

        dataList.forEach((el: any) => {
          this.courierPAckageInfoModel.id = el.id;
          this.courierPAckageInfoModel.orderNumber = el.orderNumber;
          this.courierPAckageInfoModel.packageCreateStatus = el.packageCreateStatus;
          this.courierPAckageInfoModel.packageStatus = el.packageStatus;
          this.courierPAckageInfoModel.wayBillNo = el.wayBillNo;
          this.courierPAckageInfoModel.createTime = (el.createTime * 1000).toString();

          this.packageListArray.push(this.courierPAckageInfoModel);
        })
      }
    })
  }

}
