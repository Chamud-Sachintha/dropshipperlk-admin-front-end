import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { KYCInfoModel } from 'src/app/shared/models/KYCInfoModel/kycinfo-model';
import { Request } from 'src/app/shared/models/Request/request';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { KycService } from 'src/app/shared/services/kyc/kyc.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-manage-kyc',
  templateUrl: './manage-kyc.component.html',
  styleUrls: ['./manage-kyc.component.css']
})
export class ManageKycComponent implements OnInit {

  kycList: KYCInfoModel[] = [];
  fillteredkycList: KYCInfoModel[] = [];
  searchParamModel = new SearchParam();
  requestMode = new Request();
  frontNICImage = '';
  backNICImage = '';
  fullName = '';
  sellerId = '';
  searchText = '';

  constructor(private kycService: KycService, private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.loadKycList();
  }

  onClickUpdateKycStatus(status: string) {
    this.requestMode.token = sessionStorage.getItem("authToken");

    if (status == "") {
      this.tostr.error("Empty Fields Founded", "Status is required.");
    } else {
      this.requestMode.sellerId = this.sellerId;
      this.requestMode.status = status;

      this.kycService.updateKyc(this.requestMode).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("KYC Status Updating", "KYC Status Updated Successfully");
        } else {
          this.tostr.error("Error Occured", resp.message);
        }
      })
    }
  }

 

  onClickCheckInfo(kycId: KYCInfoModel) {
    this.frontNICImage = kycId.frontImage;
    this.backNICImage = kycId.backImage;
    this.fullName = kycId.sellerName;
    this.sellerId = kycId.sellerId;
  }

  onClickSeeImage(type: number) {

    if (type == 1) {
      window.open(environment.fileServerBack + "kyc/" + this.frontNICImage)
    } else {
      window.open(environment.fileServerBack + "kyc/" + this.backNICImage)
    }
  }

  loadKycList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");

    this.spinner.show();
    this.kycService.getAllKycList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachDoc: KYCInfoModel) => {
          const formatedDate = parseInt(eachDoc.createTime) * 1000;
          eachDoc.createTime = formatedDate.toString();
          this.fillteredkycList.push(eachDoc);
          console.log(eachDoc);
          this.kycList.push(eachDoc);
        })
      }

      this.spinner.hide();
    })
  }

  filterOrderRequestList() {
    if (!this.searchText) {
      this.fillteredkycList = this.kycList; 
    } else {
      const searchTextLower = this.searchText.toLowerCase();
      this.fillteredkycList = this.kycList.filter(KYCInfoModel =>
        Object.values(KYCInfoModel).some(value =>
          value ? value.toString().toLowerCase().includes(searchTextLower) : false
        )
      );
    }
  }

}
