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
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 100;

  constructor(private router: Router, private payOutService: PayOutService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.loadSellerList();
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
