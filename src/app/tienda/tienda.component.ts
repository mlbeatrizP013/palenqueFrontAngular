import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceAPI } from '../services/service-api';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  volumen: string;
  origen: string;
  imagen: string;
  rating: number;
}

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  productos = signal<Producto[]>([]);
  productoSeleccionado = signal<Producto | null>(null);
  cantidadCarrito = signal(0);

  constructor(private api: ServiceAPI) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.api.findAllBebidas().subscribe({
      next: (bebidas: any[]) => {
        const productosFormateados = bebidas.map(b => ({
          id: b.id,
          nombre: b.nombre,
          precio: b.precio,
          descripcion: b.descripcion || 'Mezcal artesanal de alta calidad',
          volumen: '40% Vol.',
          origen: 'Oaxaca',
          imagen: b.imagen || 'assets/productos/default.jpg',
          rating: 4.8
        }));
        this.productos.set(productosFormateados);
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
        // Cargar productos por defecto en caso de error
        this.cargarProductosDefecto();
      }
    });
  }

  cargarProductosDefecto(): void {
    this.productos.set([
      {
        id: 1,
        nombre: 'PALENQUE Joven',
        precio: 1200,
        descripcion: 'Mezcal joven con notas herbales y un suave ahumado. Destilado artesanalmente en alambiques de cobre.',
        volumen: '40% Vol.',
        origen: 'Oaxaca',
        imagen: 'assets/productos/joven.jpg',
        rating: 4.8
      },
      {
        id: 2,
        nombre: 'PALENQUE Reposado',
        precio: 1650,
        descripcion: 'Reposado en barricas de roble americano por 8 meses. Sabor complejo con notas de vainilla y caramelo.',
        volumen: '42% Vol.',
        origen: 'Oaxaca',
        imagen: 'assets/productos/reposado.jpg',
        rating: 4.9
      },
      {
        id: 3,
        nombre: 'PALENQUE Ancestral',
        precio: 2400,
        descripcion: 'Destilado con técnicas prehispánicas en ollas de barro. Edición limitada de nuestra maestra artesanal.',
        volumen: '45% Vol.',
        origen: 'Oaxaca',
        imagen: 'assets/productos/ancestral.jpg',
        rating: 5
      }
    ]);
  }

  abrirDetalle(producto: Producto): void {
    this.productoSeleccionado.set(producto);
  }

  cerrarDetalle(): void {
    this.productoSeleccionado.set(null);
  }

  agregarAlCarrito(producto: Producto): void {
    this.cantidadCarrito.update(cant => cant + 1);
    console.log(`Agregado ${producto.nombre} al carrito`);
  }

  estrellas(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
