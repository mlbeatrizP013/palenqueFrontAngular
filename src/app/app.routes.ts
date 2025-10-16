import { Routes } from '@angular/router';
import { GestionTienda } from './modules/tienda/gestion-tienda/gestion-tienda';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '**',
    pathMatch: 'full' 
  },
  {
    path: 'gestion-tienda',
    component: GestionTienda
  }
];