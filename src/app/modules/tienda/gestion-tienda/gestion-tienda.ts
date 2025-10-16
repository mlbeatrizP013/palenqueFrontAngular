
import { Component, OnInit } from '@angular/core'; // Agregamos OnInit
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser'; // Para los SVG
import { MatIconRegistry, MatIconModule } from '@angular/material/icon'; // Para registrar SVG
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider'; // Aunque no se use, lo mantenemos por si acaso

@Component({
  selector: 'app-gestion-tienda',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule, // Asegúrate de importar MatIconModule
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './gestion-tienda.html',
 styleUrl: './gestion-tienda.css'})

export class GestionTienda implements OnInit { // Implementamos OnInit

  // ✨ MEJORA: Define tus datos aquí para que el HTML sea dinámico
  productosMasVendidos = [
    {
      nombre: 'Mezcal Artesanal',
      stock: 25,
      precio: 1200,
      status: 'activo', // Puede ser 'activo', 'bajo' o 'agotado'
      imagen: 'https://via.placeholder.com/50' // URL de imagen de ejemplo
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
      nombre: 'Mezcal Artesanal', // Duplicado para el ejemplo
      stock: 15,
      precio: 1200,
      status: 'activo',
      imagen: 'https://via.placeholder.com/50'
    }
  ];

  constructor(
    private matIconRegistry: MatIconRegistry, // Inyecta MatIconRegistry
    private domSanitizer: DomSanitizer        // Inyecta DomSanitizer
  ) {
    // Registra tus iconos SVG personalizados aquí
    // Asegúrate de que los archivos SVG existan en la ruta indicada (ej: src/assets/icons/)
    this.matIconRegistry.addSvgIcon(
      'store-bag',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/store-bag.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'gift-box',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/gift-box.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'home-filled',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/home-filled.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'chat-bubble',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/chat-bubble.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'chart-bar',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/chart-bar.svg')
    );
  }

  ngOnInit(): void {
    // Puedes añadir lógica de inicialización aquí si es necesario
  }

}