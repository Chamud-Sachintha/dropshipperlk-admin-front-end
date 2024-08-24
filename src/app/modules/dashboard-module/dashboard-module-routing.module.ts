import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageKycComponent } from './manage-kyc/manage-kyc.component';
import { AuthGuardGuard } from 'src/app/guards/auth/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { CheckOrderComponent } from './check-order/check-order.component';
import { PayoutLogComponent } from './payout-log/payout-log.component';
import { CheckPayoutComponent } from './check-payout/check-payout.component';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { CourierInfoComponent } from './courier-info/courier-info.component';
import { CheckPayoutLogComponent } from './check-payout-log/check-payout-log.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'adminusers',
    component: AdminUsersComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'users',
    component: ManageUsersComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'kyc-list',
    component: ManageKycComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'order-management',
    component: OrderManagementComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'check-order/:orderId',
    component: CheckOrderComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'payout-management',
    component: PayoutLogComponent
  },
  {
    path: 'payout-management/:sellerId',
    component: CheckPayoutComponent
  },
  {
    path: 'check-payout-log/:sellerId',
    component: CheckPayoutLogComponent
  },
  {
    path: 'site-settings',
    component: SiteSettingsComponent
  },
  {
    path: 'DownloadReport',
    component: ReportsComponent
  },
  {
    path: 'courier-info',
    component: CourierInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
