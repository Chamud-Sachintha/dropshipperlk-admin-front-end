import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Request } from 'src/app/shared/models/Request/request';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.css']
})
export class HeaderBannerComponent  implements OnInit {

  


  constructor(private dashboardService: DashboardService) { }
  requestPaaramModell = new Request();
  Username : string = '';
  
  @Input() headerText: string = '';

  ngOnInit(): void {
     this.getUserID();
     console.log('log',this.headerText);
  }

  getUserID(){
    

    this.requestPaaramModell.token = sessionStorage.getItem("authToken");

    this.dashboardService.getUserData(this.requestPaaramModell).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        this.Username=resp.data;
      }
    })

  }

  

}
