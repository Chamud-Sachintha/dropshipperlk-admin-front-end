import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfitLog } from 'src/app/shared/models/ProfitLog/profit-log';
import { Request } from 'src/app/shared/models/Request/request';
import { PayOutService } from 'src/app/shared/services/pay-out/pay-out.service';

@Component({
  selector: 'app-check-payout-log',
  templateUrl: './check-payout-log.component.html',
  styleUrls: ['./check-payout-log.component.css']
})
export class CheckPayoutLogComponent implements OnInit {

  requestParamModel = new Request();
  profitLogDataList: ProfitLog[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 100;
  sellerId: any = null;

  constructor(private activatedRoute: ActivatedRoute, private payoutLogService: PayOutService) {
    this.sellerId = this.activatedRoute.snapshot.params['sellerId'];
  }

  ngOnInit(): void {
    this.loadProfitShareLog();
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    // this.loadProfitLogList();
  }

  loadProfitShareLog() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.sellerId = this.sellerId;

    this.payoutLogService.getProfitShareLog(this.requestParamModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        dataList.data[0].forEach((eachData: ProfitLog) => {
          this.profitLogDataList.push(eachData);
        })
      }
    })
  }

}
