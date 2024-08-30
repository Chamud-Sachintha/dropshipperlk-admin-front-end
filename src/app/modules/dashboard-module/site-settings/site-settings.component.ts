import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Config } from 'src/app/shared/models/Config/config';
import { SiteBanner } from 'src/app/shared/models/SiteBanner/site-banner';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.css']
})
export class SiteSettingsComponent implements OnInit {

  siteBannerUploadForm!: FormGroup;
  wayBillRangeForm!: FormGroup;
  siteBannerModel = new SiteBanner();
  configModel = new Config();
  wayBillRangeCount = 0;

  constructor(private settingsService: SettingsService, private tostrService: ToastrService, private formBuilder: FormBuilder
            , private configService: ConfigService, private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {

    this.getConfig();

    this.initSiteBannerUploadForm();
    this.initCreateWayBillRangeForm();
  }

  getConfig() {
    this.configModel.token = sessionStorage.getItem("authToken");
    this.configModel.configName = "wayBillRange";

    this.configService.findConfigByName(this.configModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.wayBillRangeForm.controls['range'].setValue(resp.data[0].value);
      }
    })

    this.configModel.configName = "wayBillRangeCount";
    this.configService.findConfigByName(this.configModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.wayBillRangeCount = resp.data[0].value;
      }
    })
  }

  onSubmitWayBillRangeForm() {
    const wayBillRange = this.wayBillRangeForm.controls['range'].value;

    if (wayBillRange == null || wayBillRange == "") {
      this.tostrService.error("Please Enter Waybill Range", "Waybill Range");
    } else {
      this.configModel.token = sessionStorage.getItem("authToken");
      this.configModel.configName = "wayBillRange";
      this.configModel.configValue = wayBillRange;

      var rangeSplitValue = wayBillRange.split("-");
      var range = (parseInt(rangeSplitValue[1]) - parseInt(rangeSplitValue[0]));

      this.spinner.show();
      this.configService.addNewConfig(this.configModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.addWayBillRangeCount(range);
        } else {
          this.tostrService.error(resp.message, "Config Add.");
        }

        this.spinner.hide();
      })
    }
  }

  addWayBillRangeCount(range: number) {
    this.configModel.token = sessionStorage.getItem("authToken");
    this.configModel.configName = "wayBillRangeCount";
    this.configModel.configValue = range.toString();

    this.configService.addNewConfig(this.configModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.tostrService.success("Config Added Suuceesfully.", "Config Add.");
      } else {
        this.tostrService.error(resp.message, "Config Add.");
      }
    })
  }

  initCreateWayBillRangeForm() {
    this.wayBillRangeForm = this.formBuilder.group({
      range: ['', Validators.required]
    })
  }

  onSubmitSiteBannerUploadForm() {
    const siteBanner = this.siteBannerUploadForm.controls['siteBanner'].value;

    if (siteBanner == "") {
      this.tostrService.error("Emoty Field Found", "Site Banner is required");
    } else {
      this.convertImageToBase64(siteBanner).then((base64String) => {
        this.siteBannerModel.bannerImage = base64String;
      }).then(() => {
        this.siteBannerModel.token = sessionStorage.getItem("authToken");

        this.settingsService.addSiteBanner(this.siteBannerModel).subscribe((resp: any) => {
          if (resp.code === 1) {
            this.tostrService.success("Site Banner Upload", "Uploading Suiccessfully.");
          } else {
            this.tostrService.error("Site Banner Upload", resp.message);
          }
        })
      })
    }
  }

  onChangeSiteBannerImage(event: any) {
    const file = (event.target as any).files[0];
    this.siteBannerUploadForm.patchValue({"siteBanner": file});
  }

  initSiteBannerUploadForm() {
    this.siteBannerUploadForm = this.formBuilder.group({
      siteBanner: ['', Validators.required]
    })
  }

  convertImageToBase64(fileInput: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const file: File = fileInput;
      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        // The result attribute contains the base64 string
        const base64String: string = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      // Read the image file as a Data URL
      reader.readAsDataURL(file);
    });
  }

}
