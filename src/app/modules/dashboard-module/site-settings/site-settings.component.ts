import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SiteBanner } from 'src/app/shared/models/SiteBanner/site-banner';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.css']
})
export class SiteSettingsComponent implements OnInit {

  siteBannerUploadForm!: FormGroup;
  siteBannerModel = new SiteBanner();

  constructor(private settingsService: SettingsService, private tostrService: ToastrService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initSiteBannerUploadForm();
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
