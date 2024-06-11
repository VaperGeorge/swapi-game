import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ResourceListItem, ResourceListResponse } from '../interfaces';
import { API_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class StarShipsService {
  private readonly http = inject(HttpClient);

  private starShips$ = new BehaviorSubject<ResourceListItem[]>([]);

  get starShips(): BehaviorSubject<ResourceListItem[]> {
    return this.starShips$;
  }

  set starShips(value: ResourceListItem[]) {
    this.starShips$.next(value);
  }

  getStarShips(): Observable<ResourceListItem[]> {
    const stream$ = this.starShips$.value?.length
      ? this.starShips$
      : this.http.get<ResourceListResponse>(`${API_URL}/starships`).pipe(
          tap((response) => (this.starShips = response.results)),
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
    this.starShips = [];
  }
}
