import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieManagerService} from './cookie-manager.service';
import {environment} from '../../environments/environment.development';
import {Observable} from 'rxjs';
export interface Customer {
  _id?: string;
  name: string;
  address: string;
  salary: number;
  contact: string;
}

export interface CustomerResponse {
  message: string;
  data?: Customer;
  dataList?: Customer[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);
  private cookieManager = inject(CookieManagerService);
  private baseUrl = environment.baseUrl + '/api/v1/customers';

  private getHeaders(): HttpHeaders {
    const token = this.cookieManager.getToken('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  public createCustomer(customer: Customer): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(
      `${this.baseUrl}/create`,
      customer,
      { headers: this.getHeaders() }
    );
  }

  public updateCustomer(id: string, customer: Customer): Observable<CustomerResponse> {
    return this.http.put<CustomerResponse>(
      `${this.baseUrl}/update/${id}`,
      customer,
      { headers: this.getHeaders() }
    );
  }

  public deleteCustomer(id: string): Observable<CustomerResponse> {
    return this.http.delete<CustomerResponse>(
      `${this.baseUrl}/delete/${id}`,
      { headers: this.getHeaders() }
    );
  }

  public findCustomerById(id: string): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(
      `${this.baseUrl}/find-by-id/${id}`,
      { headers: this.getHeaders() }
    );
  }

  public loadAllCustomers(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(
      `${this.baseUrl}/load-all`,
      { headers: this.getHeaders() }
    );
  }
}
