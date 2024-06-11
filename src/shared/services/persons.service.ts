import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ResourceListItem, ResourceListResponse } from '../interfaces';
import { API_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  private readonly http = inject(HttpClient);

  private persons$ = new BehaviorSubject<ResourceListItem[]>([]);

  get persons(): BehaviorSubject<ResourceListItem[]> {
    return this.persons$;
  }

  set persons(value: ResourceListItem[]) {
    this.persons$.next(value);
  }

  getPersons(): Observable<ResourceListItem[]> {
    const stream$ = this.persons$.value?.length
      ? this.persons$
      : this.http.get<ResourceListResponse>(`${API_URL}/people`).pipe(
          tap((response) => this.persons$.next(response.results)),
          map((response) => response.results),
        );

    return stream$.pipe(
      catchError((error) => {
        console.error(error);
        return EMPTY;
      }),
    );
  }

  clear(): void {
    this.persons = [];
  }
}
