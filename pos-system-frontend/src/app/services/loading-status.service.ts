import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingStatusService {
  public status: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor() {
  }
}
