import { Component, Input, OnInit } from '@angular/core';
import { HeaderBannerComponent } from '../header-banner/header-banner.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Request } from 'src/app/shared/models/Request/request';
import { UserManagementService } from 'src/app/shared/services/User/user-management.service';
import { Reseller } from 'src/app/shared/models/Reseller/reseller';



@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  ResellerList: Reseller[] = [];
  requestMode = new Request();
  filteredResell: Reseller[] = [];
  searchText = '';

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 100;


  constructor(private formBuilder: FormBuilder, private router: Router, private ResellerService: UserManagementService
    , private tosr: ToastrService
    , private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadAllresellers();
    this.filteredResell = this.ResellerList;
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    // this.loadAllresellers();
  }

  loadAllresellers() {
    this.requestMode.token = sessionStorage.getItem("authToken");

    this.spinner.show();
    this.ResellerService.getReseller(this.requestMode).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));
      if (resp.code === 1) {
        dataList.data[0].forEach((eachOrder: Reseller) => {
          this.ResellerList.push(eachOrder);

        })
      } else {
        this.tosr.error("Not Data Found", resp.message);
      }

      this.spinner.hide();
    })
  }

  filterReselList() {

    if (this.searchText.trim() === '') {
      this.filteredResell = this.ResellerList;
    } else {
      this.filteredResell = this.ResellerList.filter(reseller =>
        reseller.full_name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

  }

  onClickResetPassword(id: string) {
    this.requestMode.token = sessionStorage.getItem("authToken");
    this.requestMode.sellerId = id;

    this.ResellerService.getResetPass(this.requestMode).subscribe((resp: any) => {

      if (resp.code === 1) {

        this.tosr.success('Operation Complete', 'Success Reset');
        window.location.reload();

      } else {
        this.tosr.error("Error found", resp.message);
      }
    })

  }


}
