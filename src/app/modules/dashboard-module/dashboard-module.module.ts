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
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HeaderBannerComponent } from './header-banner/header-banner.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { CourierInfoComponent } from './courier-info/courier-info.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';





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
    CheckPayoutComponent,
    SiteSettingsComponent,
    FilterPipe,
    HeaderBannerComponent,
    AdminUsersComponent,
    CourierInfoComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule, 
    AngularEditorModule,
    NgxPaginationModule,
    PaginationModule.forRoot(),
    
    
  ]
})
export class DashboardModuleModule { }
