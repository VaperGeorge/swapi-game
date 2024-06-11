import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GameStep } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private step$ = new BehaviorSubject<GameStep>(GameStep.START);

  get currentStep(): BehaviorSubject<GameStep> {
    return this.step$;
  }

  set currentStep(value: GameStep) {
    this.step$.next(value);
  }
}
