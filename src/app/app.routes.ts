import { Routes } from '@angular/router';
import { GameStep } from '../shared';

export const routes: Routes = [
  {
    path: `${GameStep.START}`,
    loadComponent: () =>
      import('./start/start.component').then((mod) => mod.StartComponent),
  },
  {
    path: `${GameStep.SELECTION}`,
    loadComponent: () =>
      import('./type-selection/type-selection.component').then(
        (mod) => mod.TypeSelectionComponent
      ),
  },
  {
    path: `${GameStep.GAME}`,
    loadComponent: () =>
      import('./game/game.component').then((mod) => mod.GameComponent),
  },
  { path: '', redirectTo: `${GameStep.START}`, pathMatch: 'full' },
];
