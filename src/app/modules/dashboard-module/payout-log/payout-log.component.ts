import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PayOut } from 'src/app/shared/models/PayOut/pay-out';
import { Request } from 'src/app/shared/models/Request/request';
import { PayOutService } from 'src/app/shared/services/pay-out/pay-out.service';

@Component({
  selector: 'app-payout-log',
  templateUrl: './payout-log.component.html',
  styleUrls: ['./payout-log.component.css']
})
export class PayoutLogComponent implements OnInit {

  requestParamModel = new Request();
  sellerList: PayOut[] = [];
  totalPayOutAmount = 0;
  totalPendingAmount = 0;
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 100;
  searchText = '';
  selectedFilter = '';

  constructor(private router: Router, private payOutService: PayOutService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.loadSellerList();
    this.loadPayOutSummeryInfo();
  }

  filterPayOutList() {
    const searchTextLower = this.searchText.toLowerCase();
    console.log(searchTextLower)
    switch (this.selectedFilter) {
      case 'sellerName':
        this.sellerList = this.sellerList.filter(payOut =>
          payOut.resellerName.toString().toLowerCase().includes(searchTextLower)
        );
        break;
      case 'sellerRef':
        this.sellerList = this.sellerList.filter(payOut =>
          payOut.resellerReferral.toString().toLowerCase().includes(searchTextLower)
        );
        break;
      default:
        
    }
  }

  loadPayOutSummeryInfo() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");

    this.payOutService.getPayOutSummeryInfo(this.requestParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.totalPayOutAmount = resp.data[0].totalPauOutAmount;
        this.totalPendingAmount = resp.data[0].totalPendingAmount;
      }
    })
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    // this.loadSellerList();
  }

  onCickCheckPayout(sellerId: string) {
    this.router.navigate(['/app/payout-management', sellerId])
  }

  loadSellerList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    
    this.spinner.show();
    this.payOutService.getSellerList(this.requestParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        dataList.data[0].forEach((eachSeller: PayOut) => {
          this.sellerList.push(eachSeller);
        })
      }

      this.spinner.hide();
    })
  }

}
