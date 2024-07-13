import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PayOut } from 'src/app/shared/models/PayOut/pay-out';
import { PayOutLog } from 'src/app/shared/models/PayOutLog/pay-out-log';
import { Request } from 'src/app/shared/models/Request/request';
import { PayOutService } from 'src/app/shared/services/pay-out/pay-out.service';
import { BankDetails } from 'src/app/shared/models/BankDetails/bank-details';

@Component({
  selector: 'app-check-payout',
  templateUrl: './check-payout.component.html',
  styleUrls: ['./check-payout.component.css']
})
export class CheckPayoutComponent implements OnInit {

  requestPatamModel = new Request();
  payOutModel = new PayOut();
  BankDetails = new BankDetails();
  payOutLogList: PayOutLog[] = [];
  sellerId!: string;

  constructor(private activatedRoute: ActivatedRoute, private payOutService: PayOutService
              , private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.sellerId = this.activatedRoute.snapshot.params['sellerId'];
    this.loadPayOutInfo();
  }

  onClickReleasePayOut(amount: string) {
    this.requestPatamModel.token = sessionStorage.getItem("authToken");
    this.requestPatamModel.sellerId = this.sellerId;
    this.requestPatamModel.amount = amount;

    this.spinner.show();
    this.payOutService.releasePayOut(this.requestPatamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.tostr.success("Release payout", "Sucess");
      } else {
        this.tostr.error("Release Payouit", resp.mesage);
      }

      this.spinner.hide();
    })
  }

  loadPayOutInfo() {
    this.requestPatamModel.token = sessionStorage.getItem("authToken");
    this.requestPatamModel.sellerId = this.sellerId;

    this.spinner.show();
    this.payOutService.getPayOutInfo(this.requestPatamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.payOutModel.totalPayOutAmount = dataList.data[0].totalPayOutAmount;
        this.payOutModel.totalPendingAmount = dataList.data[0].totalPendingAmount;
        this.payOutModel.todayPayOutAmount = dataList.data[0].todayPayOutAmount;
        this.BankDetails.AccountNumber = dataList.data[0].account_number;
        this.BankDetails.BankName = dataList.data[0].bank_name;
        this.BankDetails.BranchCode = dataList.data[0].branch_code;
        this.BankDetails.Name = dataList.data[0].resellr_name;

        dataList.data[0].list.forEach((eachData: PayOutLog) => {
          this.payOutLogList.push(eachData)
        })
      }

      this.spinner.hide();
    })
  }

}
