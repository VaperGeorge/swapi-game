import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { GameStep, StepService } from '../../shared';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly stepService = inject(StepService);

  ngOnInit(): void {
    this.stepService.clearValues();
  }

  nextStep() {
    this.router.navigate([`${GameStep.SELECTION}`]);
    this.stepService.currentStep = GameStep.SELECTION;
  }
}
