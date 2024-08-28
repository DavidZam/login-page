import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule], // Include CommonModule
  templateUrl: './login.component.html',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public loginError: string | null = null; // Property to hold login error message

  public onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          this.loginError = null; // Clear any previous error
          this.router.navigate(['/dashboard']); // Redirect on successful login
        },
        error: (err) => {
          this.loginError = 'Invalid email or password. Please try again.'; // Set error message
          console.log(err);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
