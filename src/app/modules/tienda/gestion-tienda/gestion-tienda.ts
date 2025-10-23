
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
      imagen: 'assets/images/botella.jpg' 
    },
    {
      nombre: 'Camiseta Palenque',
      stock: 12,
      precio: 350,
      status: 'bajo',
      imagen: 'assets/images/botella.jpg'
    },
    {
      nombre: 'Artesanía Oaxaqueña',
      stock: 0,
      precio: 800,
      status: 'agotado',
      imagen: 'assets/images/botella.jpg'
    },
    {
      nombre: 'Mezcal Artesanal', 
      stock: 15,
      precio: 1200,
      status: 'activo',
      imagen: 'assets/images/botella.jpg'
    }
  ];

  constructor(
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer       
  ) {
    
   this.matIconRegistry.addSvgIcon(
      'store-bag',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/store.svg') // ⬅️ Correcto
    );
    
    // 2. Icono de Regalo (Gift Box)
    // El archivo calendar-solid.svg es el único disponible, aunque no es lógico.
    this.matIconRegistry.addSvgIcon(
      'gift-box',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar.svg') // ⬅️ Usamos el disponible
    );
    
    // 3. Icono de Inicio (Home Filled)
    // Usaremos el icono de tienda (Store) como el de 'Inicio' si no hay un icono de casa disponible.
    // El 'comment-solid.svg' es incorrecto para 'home'.
    this.matIconRegistry.addSvgIcon(
      'home-filled',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/store.svg') // ⬅️ Usamos store-solid como placeholder para Home/Tienda
    );
    
    // 4. Icono de Chat/Burbuja
    this.matIconRegistry.addSvgIcon(
      'chat-bubble',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/comment.svg') // ⬅️ Correcto
    );
    
   
    this.matIconRegistry.addSvgIcon(
      'chart-bar',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/signal.svg') // ⬅️ Usamos el archivo signal-solid.svg
    );
  }

  ngOnInit(): void {
  }

}