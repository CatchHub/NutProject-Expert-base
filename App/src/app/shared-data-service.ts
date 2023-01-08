import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  public editDataDetails: any = [];

  private profileIDSource = new BehaviorSubject(this.editDataDetails);

  public selectedProfileID = this.profileIDSource.asObservable();
  constructor() {
    this.profileIDSource.next(1);
  }

  changeSelectedProfile(_selectedProfileID) {
    this.profileIDSource.next(_selectedProfileID);
  }
}
