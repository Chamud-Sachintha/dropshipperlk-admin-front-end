import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/shared/models/Auth/auth';
import { AuthService } from 'src/app/shared/services/Auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authModel = new Auth();
  loginAdminForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService
            , private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initLoginAdminForm();
  }

  onSubmitLoginAdminForm() {
    const userName = this.loginAdminForm.controls['userName'].value;
    const password = this.loginAdminForm.controls['password'].value;
    
    if (userName == "") {
      this.tostr.error("Empty Field Found", "User name is required.");
    } else if (password == "") {
      this.tostr.error("Empty Field Found", "Paswword is required.");
    } else {
      this.authModel.userName = userName;
      this.authModel.password = password;

      this.spinner.show();
      this.authService.loginAdminUser(this.authModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          sessionStorage.setItem("authToken", resp.token);

          this.tostr.success("User Authentication", "User Logged in Successfully");
          this.router.navigate(['app/home']);
        } else {
          this.tostr.error("User Authetication", resp.message);
        }

        this.spinner.hide();
      })
    }
  }

  initLoginAdminForm() {
    this.loginAdminForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
