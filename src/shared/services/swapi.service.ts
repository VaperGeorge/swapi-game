import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap, catchError, EMPTY } from 'rxjs';

import { PersonsService } from './persons.service';
import {
  PersonInfo,
  PersonResponse,
  StarShip,
  StarshipApiResponse,
} from '../interfaces';
import { StarShipsService } from './starships.service';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private readonly http = inject(HttpClient);
  private readonly personsService = inject(PersonsService);
  private readonly starShipsService = inject(StarShipsService);

  getRandomPerson(): Observable<PersonInfo> {
    console.log('TEST 2');

    return this.personsService.getPersons().pipe(
      switchMap((people) => {
        const randomPerson = people[this.getRandomNumber(people)];
        return this.http.get<PersonResponse>(randomPerson.url);
      }),
      map((response) => response.result.properties),
      catchError((error) => {
        console.error(error);
        return EMPTY;
      })
    );
  }

  getRandomStarship(): Observable<StarShip> {
    console.log('TEST 2');

    return this.starShipsService.getStarShips().pipe(
      switchMap((starships) => {
        const randomStarship = starships[this.getRandomNumber(starships)];
        return this.http.get<StarshipApiResponse>(randomStarship.url);
      }),
      map((response) => response.result.properties),
      catchError((error) => {
        console.error(error);
        return EMPTY;
      })
    );
  }

  getRandomNumber(list: any[]): number {
    return Math.floor(Math.random() * list.length);
  }
}
