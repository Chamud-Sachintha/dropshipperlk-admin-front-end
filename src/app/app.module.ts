import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardHeaderComponent } from './shared/dashboard-header/dashboard-header.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    AuthLayoutComponent,
    DashboardHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
