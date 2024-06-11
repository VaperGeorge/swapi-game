import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import {
  GameStep,
  LEFT_WINS_KEY,
  PersonInfo,
  RIGHT_WINS_KEY,
  Resource,
  ResourceService,
  StarShip,
  SwapiService,
} from '../../shared';
import { InfoCardComponent } from '../info-card/info-card.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    InfoCardComponent,
    MatCardModule,
    AsyncPipe,
    MatProgressSpinnerModule,
    MatButtonModule,
    NgTemplateOutlet,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  private readonly swapiService = inject(SwapiService);
  private readonly resourceService = inject(ResourceService);
  private readonly router = inject(Router);
  private cookieService = inject(CookieService);

  leftWinsCount: number = +this.cookieService.get(LEFT_WINS_KEY) || 0;
  rightWinsCount: number = +this.cookieService.get(RIGHT_WINS_KEY) || 0;
  rightWins = false;
  leftWins = false;

  resourceType$ = this.resourceService.currentResource;
  fetchCards$ = new Subject<void>();
  loading$ = new BehaviorSubject<boolean>(false);

  leftCard$ =
    this.resourceType$.value === Resource.PEOPLE
      ? this.swapiService.getRandomPerson()
      : this.swapiService.getRandomStarship();

  rightCard$ =
    this.resourceType$.value === Resource.PEOPLE
      ? this.swapiService.getRandomPerson()
      : this.swapiService.getRandomStarship();

  result$ = this.fetchCards$.pipe(
    tap(() => this.loading$.next(true)),
    startWith(null),
    switchMap(() =>
      combineLatest([this.leftCard$, this.rightCard$]).pipe(
        tap(([leftCard, rightCard]) => {
          if (this.resourceType$.value === Resource.PEOPLE) {
            const { mass: leftMass } = leftCard as PersonInfo;
            const { mass: rightMass } = rightCard as PersonInfo;
            this.compareCards(leftMass, rightMass);
          } else {
            const { crew: leftCrew } = leftCard as StarShip;
            const { crew: rightCrew } = rightCard as StarShip;
            this.compareCards(leftCrew, rightCrew);
          }
        }),
      ),
    ),
    tap(() => this.loading$.next(false)),
  );

  compareCards(leftValue: string, rightValue: string) {
    const left = Number.parseInt(leftValue);
    const right = Number.parseInt(rightValue);
    this.leftWins = false;
    this.rightWins = false;

    if (left > right) {
      this.leftWinsCount++;
      this.leftWins = true;
    }
    if (right > left) {
      this.rightWinsCount++;
      this.rightWins = true;
    }

    this.cookieService.set(LEFT_WINS_KEY, `${this.leftWinsCount}`);
    this.cookieService.set(RIGHT_WINS_KEY, `${this.rightWinsCount}`);
  }

  goToStart() {
    this.router.navigate([`${GameStep.START}`]);
  }

  fetchRandomCards() {
    this.fetchCards$.next();
  }
}
