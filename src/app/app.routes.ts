import { Routes } from '@angular/router';

// Importa el "cascarón"
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  // --- RUTAS DE AUTENTICACIÓN (Fuera del Layout) ---
  // Las agrupamos para que sea más fácil de cargar

  // --- RUTAS DE LA APLICACIÓN (Dentro del Layout) ---
  {
    path: '', // La ruta raíz (ej. localhost:4200)
    component: MainLayout, // Carga el "cascarón"
    children: [
      // Si la ruta está vacía (path: ''), redirige a 'inicio'
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      
      // Carga las páginas dentro del <router-outlet> del MainLayout
      {
        path: 'inicio',
        loadComponent: () =>
          import('./pages/inicio/inicio').then(
            (m) => m.Inicio
          ),
      },
      {
        path: 'catalogo',
        loadComponent: () =>
          import('./pages/catalogo/catalogo').then(
            (m) => m.Catalogo
          ),
      },
      {
        path: 'experiencias',
        loadComponent: () =>
          import('./pages/experiencias/experiencias').then(
            (m) => m.Experiencias
          ),
      },
      {
        path: 'foro',
        loadComponent: () =>
          import('./pages/foro/foro').then((m) => m.Foro),
      },
      {
        path: 'solicitudes',
        loadComponent: () =>
          import('./pages/solicitudes/solicitudes').then(
            (m) => m.Solicitudes
          ),
      },
    ],
  },

  // --- Ruta comodín (Wildcard) ---
  // (Opcional) Redirige a inicio si la ruta no existe
  { path: '**', redirectTo: 'inicio' },
];