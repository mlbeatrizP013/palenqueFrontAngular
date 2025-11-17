import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


// 1. Importa tus componentes de layout
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
  standalone: true,
  // 2. Añádelos a los imports
  imports: [
    CommonModule, 
    RouterOutlet, 
    Sidebar, 
    Header
  ]
})
export class MainLayout {}