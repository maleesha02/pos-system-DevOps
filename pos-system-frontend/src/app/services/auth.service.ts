import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  private baseUrl = environment.baseUrl + '/api/v1/users'

  public login(email: any, password: any): Observable<any> {
    return this.http.post(this.baseUrl + '/login', {
      email: email, password: password
    })
  }

  public signup(fullName: any, email: any, password: any): Observable<any> {
    return this.http.post(this.baseUrl + '/signup', {
      fullName: fullName, email: email, password: password
    })
  }
}
