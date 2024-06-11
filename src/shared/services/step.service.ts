import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { GameStep } from '../enums';
import {
  LEFT_WINS_KEY,
  RESOURCE_KEY,
  RIGHT_WINS_KEY,
} from '../constants/constants';
import { StarShipsService } from './starships.service';
import { PersonsService } from './persons.service';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private cookieService = inject(CookieService);
  private starShipsService = inject(StarShipsService);
  private personsService = inject(PersonsService);

  private step$ = new BehaviorSubject<GameStep>(GameStep.START);

  get currentStep(): BehaviorSubject<GameStep> {
    return this.step$;
  }

  set currentStep(value: GameStep) {
    this.step$.next(value);
  }

  clearValues(): void {
    this.currentStep = GameStep.START;
    this.cookieService.delete(LEFT_WINS_KEY);
    this.cookieService.delete(RIGHT_WINS_KEY);
    this.cookieService.delete(RESOURCE_KEY);
    this.personsService.clear();
    this.starShipsService.clear();
  }
}
