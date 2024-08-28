import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:3000/users';
  private authUserKey = 'authUser';

  signup(data: any) {
    return this.httpClient.post(this.baseUrl, data);
  }

  login(data: any) {
    const url = `${this.baseUrl}?email=${data.email}&password=${data.password}`;
    return this.httpClient.get<any[]>(url).pipe(
      map((users) => {
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem(this.authUserKey, JSON.stringify(user));
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.authUserKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.authUserKey) !== null;
  }

  getLoggedInUser(): any {
    return JSON.parse(localStorage.getItem(this.authUserKey) || '{}');
  }
}
