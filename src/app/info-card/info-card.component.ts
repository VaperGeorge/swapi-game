import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgClass, TitleCasePipe } from '@angular/common';

import {
  CompareStatus,
  PersonInfo,
  Resource,
  ResourceService,
  StarShip,
} from '../../shared';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [MatCardModule, TitleCasePipe, AsyncPipe, NgClass],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCardComponent {
  private readonly resourceService = inject(ResourceService);

  @Input() set data(value: PersonInfo | StarShip) {
    this.resource$.value === Resource.PEOPLE
      ? (this.person = value as PersonInfo)
      : (this.starShip = value as StarShip);
  }

  @Input() status: CompareStatus = CompareStatus.DRAW;

  resource$ = this.resourceService.currentResource;

  Resource = Resource;

  starShip!: StarShip;
  person!: PersonInfo;
}
