import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Asistente {
  id: number;
  nombre: string;
  correo: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
} 

@Component({
  selector: 'app-asistencia-list',
  imports: [CommonModule],
  templateUrl: './asistencia-list.html',
  styleUrl: './asistencia-list.css'
})

export class AsistenciaList {
  
  asistentes: Asistente[] = [
    { id: 1, nombre: 'María López', correo: 'maria@example.com', estado: 'pendiente' },
    { id: 2, nombre: 'Juan Pérez', correo: 'juan@example.com', estado: 'pendiente' },
    { id: 3, nombre: 'Lucía Torres', correo: 'lucia@example.com', estado: 'aprobada' },
  ];

  asistentesConfirmados = [
    { nombre: 'María López', correo: 'maria@example.com', fecha: new Date() },
    { nombre: 'Beatriz Ruiz', correo: 'bea@example.com', fecha: new Date() }
  ];

  confirmarAccion(asistente: Asistente, nuevaAccion: 'aprobada' | 'rechazada'): void {
    const mensaje =
      nuevaAccion === 'aprobada'
        ? `¿Seguro que deseas aprobar a ${asistente.nombre}?`
        : `¿Seguro que deseas rechazar a ${asistente.nombre}?`;

    const confirmar = confirm(mensaje);
    if (confirmar) {
            asistente.estado = nuevaAccion; 
      console.log(`Asistente ${asistente.nombre} marcado como ${nuevaAccion}`);
    }
  }
}
