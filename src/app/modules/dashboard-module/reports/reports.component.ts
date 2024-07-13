import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PrintService } from 'src/app/shared/services/print/print.service';
import { Request } from 'src/app/shared/models/Request/request';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  selectedReportType: string = '';
  reportType: string ='';
  requestDownload = new Request();
  selectedOrderNumbers: any;
  requestParamModel: any;


  constructor(private fb: FormBuilder, private printService: PrintService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
   
  }

  downloadReport(): void {
    this.requestDownload.selectedReportType = this.selectedReportType;
    this.requestDownload.token = sessionStorage.getItem('authToken');

    this.spinner.show();
    this.printService.DownOrderRepport(this.requestDownload).subscribe(
      (blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'simple_excel_sheet.xlsx'; // Set the desired filename
        link.click();
      },
      (error) => {
        console.error('Error downloading report:', error);
      }
    );

    this.spinner.hide();
  }
}
