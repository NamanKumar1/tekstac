// // login.component.ts

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CodeService } from '../_service/code.service'; // Update with the correct path

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm!: FormGroup;
//   authenticationError: boolean = false;

//   constructor(private fb: FormBuilder, private codeService: CodeService) {
//     this.loginForm = this.fb.group({
//       userName: ['', Validators.required],
//       userPassword: ['', Validators.required]
//     });
//   }

//   login() {
//     if (this.loginForm.valid) {
//       const request = this.loginForm.value;
//       this.codeService.authenticateUser(request).subscribe(
//         (response) => {
//           if (response) {
//             // Authentication successful, handle accordingly (e.g., navigate to another page)
//             console.log('Authentication successful');
//           } else {
//             // Authentication failed, show error message or handle accordingly
//             console.log('Authentication failed');
//             this.authenticationError = true;
//           }
//         },
//         (error) => {
//           // Handle error
//           console.error(error);
//           this.authenticationError = true;
//         }
//       );
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { TokenStorageService } from '../_service/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  login(): void {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        console.log("login successful");
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
   
}

