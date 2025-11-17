import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { HomeComponent } from './home/home.component';
import { ForoComponent } from './foro/foro.component';
import { TiendaComponent } from './tienda/tienda.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'foro', component: ForoComponent },
      { path: 'tienda', component: TiendaComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'tabs' },
];