import { Routes } from '@angular/router';
import { GestionTienda } from './modules/tienda/gestion-tienda/gestion-tienda';
import { Catalogo } from './modules/tienda/catalogo/catalogo';
import { AgregarEditarProducto } from './modules/tienda/agregar-editar-producto/agregar-editar-producto';
import { ModeracionForo } from './modules/foro/moderacion-foro/moderacion-foro';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '**',
    pathMatch: 'full' 
  },
  {
    path: 'gestion-tienda',
    component: GestionTienda
  },
  {
    path: 'catalogo',
    component: Catalogo
  },
  {
    path: 'agregar-editar-producto',
    component: AgregarEditarProducto
  },
  {
    path: 'moderacion-foro',
    component: ModeracionForo
  }
];