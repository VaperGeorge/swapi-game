import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { GameStep, ResourceService, StepService, Resource } from '../../shared';

@Component({
  selector: 'app-type-selection',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './type-selection.component.html',
  styleUrl: './type-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeSelectionComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly stepService = inject(StepService);
  private readonly resourceService = inject(ResourceService);

  Resource = Resource;

  ngOnInit(): void {
    this.stepService.currentStep = GameStep.SELECTION;
  }

  changeResourceType(type: Resource): void {
    this.router.navigate([`${GameStep.GAME}`]);
    this.resourceService.currentResource = type;
    this.stepService.currentStep = GameStep.GAME;
  }
}
