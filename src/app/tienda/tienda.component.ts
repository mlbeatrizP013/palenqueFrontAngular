import { Component, OnInit } from '@angular/core';
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
  imagen: string; // data URL o base64 con prefijo
  categoria: { id: number; nombre: string };
}

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TiendaComponent  implements OnInit {
  bebidas$!: Observable<Bebida[]>;
  usuarios$!: Observable<Usuario[]>;
  selectedUserId: number | null = null;
  qty: Record<number, number> = {};

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

}
