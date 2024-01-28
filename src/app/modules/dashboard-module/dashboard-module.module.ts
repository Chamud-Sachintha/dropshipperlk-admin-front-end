import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageKycComponent } from './manage-kyc/manage-kyc.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrderManagementComponent } from './order-management/order-management.component';
import { CheckOrderComponent } from './check-order/check-order.component';
import { PayoutLogComponent } from './payout-log/payout-log.component';
import { CheckPayoutComponent } from './check-payout/check-payout.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddProductComponent,
    AddCategoryComponent,
    ManageUsersComponent,
    ManageKycComponent,
    OrderManagementComponent,
    CheckOrderComponent,
    PayoutLogComponent,
    CheckPayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class DashboardModuleModule { }
