import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServiceAPI } from '../services/service-api';

interface Usuario {
  id: number;
  nome: string;
}

interface Bebida {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  categoria: { id: number; nombre: string };
}

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
  // Propiedades para bebidas (apartado)
  bebidas$!: Observable<Bebida[]>;
  usuarios$!: Observable<Usuario[]>;
  selectedUserId: number | null = null;
  qty: Record<number, number> = {};
  
  // Propiedades para productos (catálogo)
  productos = signal<Producto[]>([]);
  productoSeleccionado = signal<Producto | null>(null);
  cantidadCarrito = signal(0);

  constructor(private api: ServiceAPI) { }

  ngOnInit() {
    this.bebidas$ = this.api.findAllBebidas();
    this.usuarios$ = this.api.getUsuarios();
  }

  onSelectUser(idStr: string) {
    const id = Number(idStr);
    this.selectedUserId = Number.isFinite(id) ? id : null;
  }

  displayedStock(b: Bebida): number {
    return b.stock - (this.qty[b.id] || 0);
  }

  inc(b: Bebida) {
    const current = this.qty[b.id] || 0;
    if (current < b.stock) this.qty[b.id] = current + 1;
  }

  dec(b: Bebida) {
    const current = this.qty[b.id] || 0;
    if (current > 0) this.qty[b.id] = current - 1;
  }

  canApartar(b: Bebida): boolean {
    return !!this.selectedUserId && (this.qty[b.id] || 0) > 0;
  }

  apartar(b: Bebida) {
    const cantidad = this.qty[b.id] || 0;
    if (!this.selectedUserId || cantidad <= 0) return;
    const payload = {
      cantidad,
      usuarioID: this.selectedUserId,
      bebidasID: b.id,
    };
    this.api.createApartado(payload).subscribe({
      next: () => {
        const nuevoStock = b.stock - cantidad;
        this.api.patchBebida(b.id, { stock: nuevoStock }).subscribe({
          next: () => {
            this.bebidas$ = this.api.findAllBebidas();
            this.qty[b.id] = 0;
          }
        });
      }
    });
  }

  // Métodos para productos
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
      }
    });
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