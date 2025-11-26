import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {

  constructor(private cookieService: CookieService) {
  }

  public setToken(token: string, name: string) {
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 9);
    this.cookieService.set(name, token, expiryDate, '/');
  }

  public tokenExists(name: string) {
    return this.cookieService.check(name);
  }

  public getToken(name: string): string {
    return this.cookieService.get(name);
  }

  public tokenIsExistsWithPromise(name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const exists = this.cookieService.check(name);
        if (exists) {
          resolve(true);
        } else {
          reject(false);
        }
      } catch (error) {
        reject(false);
      }
    })
  }

}
