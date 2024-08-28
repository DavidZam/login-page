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
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule], // Include CommonModule
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  authService = inject(AuthService);
  router = inject(Router);

  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    terms: new FormControl(false, [Validators.requiredTrue]), // Checkbox control
  });

  public onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (data: any) => {
          this.router.navigate(['/login']); // Redirect on successful signup
        },
        error: (err) => console.log(err),
      });
    } else {
      this.signupForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
    }
  }
}
