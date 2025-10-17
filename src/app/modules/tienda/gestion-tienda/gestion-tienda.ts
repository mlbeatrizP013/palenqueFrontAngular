
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider'; 

@Component({
  selector: 'app-gestion-tienda',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule, 
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './gestion-tienda.html',
 styleUrl: './gestion-tienda.css'})

export class GestionTienda implements OnInit { 

  productosMasVendidos = [
    {
      nombre: 'Mezcal Artesanal',
      stock: 25,
      precio: 1200,
      status: 'activo', 
      imagen: 'https://via.placeholder.com/50' 
    },
    {
      nombre: 'Camiseta Palenque',
      stock: 12,
      precio: 350,
      status: 'bajo',
      imagen: 'https://via.placeholder.com/50'
    },
    {
      nombre: 'Artesanía Oaxaqueña',
      stock: 0,
      precio: 800,
      status: 'agotado',
      imagen: 'https://via.placeholder.com/50'
    },
    {
      nombre: 'Mezcal Artesanal', 
      stock: 15,
      precio: 1200,
      status: 'activo',
      imagen: 'https://via.placeholder.com/50'
    }
  ];

  constructor(
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer       
  ) {
    
    this.matIconRegistry.addSvgIcon(
      'store-bag',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/store-tienda.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'gift-box',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'home-filled',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/comment-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'chat-bubble',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/comment-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'chart-bar',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/store-solid.svg')
    );
  }

  ngOnInit(): void {
  }

}