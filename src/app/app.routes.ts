import { Routes } from '@angular/router';
import { GameStep } from '../shared';

export const routes: Routes = [
  {
    path: `${GameStep.START}`,
    loadComponent: () =>
      import('./start/start.component').then((mod) => mod.StartComponent),
  },
  { path: '', redirectTo: `${GameStep.START}`, pathMatch: 'full' },
];
