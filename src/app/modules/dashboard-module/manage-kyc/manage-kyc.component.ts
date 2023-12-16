import { Component, OnInit } from '@angular/core';
import { KYCInfoModel } from 'src/app/shared/models/KYCInfoModel/kycinfo-model';
import { SearchParam } from 'src/app/shared/models/SearchParam/search-param';
import { KycService } from 'src/app/shared/services/kyc/kyc.service';

@Component({
  selector: 'app-manage-kyc',
  templateUrl: './manage-kyc.component.html',
  styleUrls: ['./manage-kyc.component.css']
})
export class ManageKycComponent implements OnInit {

  kycList: KYCInfoModel[] = [];
  searchParamModel = new SearchParam();

  constructor(private kycService: KycService) {}

  ngOnInit(): void {
    this.loadKycList();
  }

  loadKycList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");

    this.kycService.getAllKycList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachDoc: KYCInfoModel) => {
          const formatedDate = parseInt(eachDoc.createTime) * 1000;
          eachDoc.createTime = formatedDate.toString();

          this.kycList.push(eachDoc);
        })
      }
    })
  }

}
