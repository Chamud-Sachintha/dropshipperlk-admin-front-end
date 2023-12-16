import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.initLoginAdminForm();
  }

  onSubmitLoginAdminForm() {
    const userName = this.loginAdminForm.controls['userName'].value;
    const password = this.loginAdminForm.controls['password'].value;
    
    if (userName == "") {

    } else if (password == "") {

    } else {
      this.authModel.userName = userName;
      this.authModel.password = password;

      this.authService.loginAdminUser(this.authModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          sessionStorage.setItem("authToken", resp.token);

          this.router.navigate(['app/home']);
        } else {
          
        }
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
