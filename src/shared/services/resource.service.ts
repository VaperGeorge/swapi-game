import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { Resource } from '../enums';
import { RESOURCE_KEY } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private cookieService = inject(CookieService);

  private resource$ = new BehaviorSubject<Resource>(Resource.PEOPLE);

  get currentResource(): BehaviorSubject<Resource> {
    const savedResource = this.cookieService.get(RESOURCE_KEY);

    if (savedResource) {
      this.resource$.next(savedResource as Resource);
    }

    return this.resource$;
  }

  set currentResource(value: Resource) {
    this.cookieService.set(RESOURCE_KEY, value);
    this.resource$.next(value);
  }
}
