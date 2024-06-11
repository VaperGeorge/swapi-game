import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Resource } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private resource$ = new BehaviorSubject<Resource>(Resource.PEOPLE);

  get currentResource(): BehaviorSubject<Resource> {
    return this.resource$;
  }

  set currentResource(value: Resource) {
    this.resource$.next(value);
  }
}
