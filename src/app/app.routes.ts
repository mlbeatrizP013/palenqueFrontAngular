import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { HomeComponent } from './home/home.component';
import { ForoComponent } from './foro/foro.component';
import { TiendaComponent } from './tienda/tienda.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
// IMPORTANTE: Importa aquí tus componentes de Experiencias y Visita si ya los creaste
// import { ExperienciasComponent } from './experiencias/experiencias.component';
// import { VisitaComponent } from './visita/visita.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsComponent, // <--- CORRECCIÓN CLAVE: Este es el layout (Sidebar + Outlet)
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'foro',
        component: ForoComponent
      },
      {
        path: 'tienda', // Esto se usará para el enlace "Catálogo"
        component: TiendaComponent
      },
      {
        path: 'solicitudes',
        component: SolicitudComponent
      },
      {
        path: 'experiencias',
        component: ExperienciaComponent // <--- CAMBIAR por ExperienciasComponent cuando lo tengas
      },
      {
        path: 'visita-personalizada',
        component: SolicitudComponent // <--- CAMBIAR por VisitaComponent cuando lo tengas
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/tabs/home'
  }
];