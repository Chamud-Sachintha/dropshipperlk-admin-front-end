import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourierPackage } from 'src/app/shared/models/CourierPackage/courier-package';
import { OrderRequest } from 'src/app/shared/models/OrderRequest/order-request';
import { Request } from 'src/app/shared/models/Request/request';
import { CourierService } from 'src/app/shared/services/courier/courier.service';
import { PrintService } from 'src/app/shared/services/print/print.service';

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
  searchText = '';
  selectedFilter = '';
  filteredOrderRequestList: CourierPackage[] = [];
  orderRequestList: OrderRequest[] = [];
  selectedOrderNumbers: any[] = [];
  selectedOrdersToPrint = 0;
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 100;

  constructor(private courierService: CourierService, private tostr: ToastrService, private formBuilder: FormBuilder
              , private spinner: NgxSpinnerService , private printService: PrintService
  ) {}

  ngOnInit(): void {
    this.getCourierPackageList();
    this.initOrderStatusChangeForm();

    this.filteredOrderRequestList = this.packageListArray;
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    // this.getCourierPackageList();
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

  removeOrderNumber(orderNumber: string) {
    const index = this.selectedOrderNumbers.indexOf(orderNumber);
    if (index > -1) { // only splice array when item is found
      this.selectedOrderNumbers.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  onClickPrintWayBillPdf() {
    this.requestParamModel.orderNumbers = this.selectedOrderNumbers;
    this.requestParamModel.token = sessionStorage.getItem("authToken");

    this.printService.viewPdf(this.requestParamModel).subscribe(
      (response: HttpResponse<Blob>) => {
        if (response.body) {
          const blob = new Blob([response.body], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        } else {
          console.error('Response body is null');
        }
      },
      (error) => {
        console.error('Error fetching PDF:', error);
      }
    );
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
    this.requestParamModel.token = sessionStorage.getItem("authToken");

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

  filterOrderRequestList() {
    const searchTextLower = this.searchText.toLowerCase();
    console.log(this.selectedFilter)
    switch (this.selectedFilter) {
      case 'orderNo':
        this.filteredOrderRequestList = this.packageListArray.filter(order =>
          order.orderNumber.toString().toLowerCase().includes(searchTextLower)
        );
        break;
      case 'orderStatus':
        this.filteredOrderRequestList = this.packageListArray.filter(order =>
          order.orderStatus.toString().toLowerCase().includes(searchTextLower)
        );
        break;
      case 'resellerName':
        this.filteredOrderRequestList = this.packageListArray.filter(order =>
          order.resellerName.toString().toLowerCase().includes(searchTextLower)
        );
        break;
      case 'resellerReferral':
        this.filteredOrderRequestList = this.packageListArray.filter(order =>
          order.refCode.toString().toLowerCase().includes(searchTextLower)
        );
        break;
      case 'trackingNumber':
        this.filteredOrderRequestList = this.packageListArray.filter(order => 
          order.wayBillNo.toString().toLowerCase().includes(searchTextLower)
        )
        break;
      case 'courierStatus':
        this.filteredOrderRequestList = this.packageListArray.filter(order => 
          order.packageStatus.toString().toLowerCase().includes(searchTextLower)
        )
        break;
      case 'packageCreateStatus':
        this.filteredOrderRequestList = this.packageListArray.filter(order => 
          order.packageCreateStatus.toString().toLowerCase().includes(searchTextLower)
        )
        break;
      case 'orderDate':
        this.filteredOrderRequestList = this.packageListArray.filter(order =>
          order.createTime.toString().toLowerCase().includes(searchTextLower)
        );
        break;
      case '':
        this.filteredOrderRequestList = this.packageListArray;

        break;
      default:
        this.filteredOrderRequestList = this.packageListArray;
    }
  }

}
