import { Injectable,signal } from '@angular/core';
import { Experiencia,Asistente } from '../interfaces/experiencia';
@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private experiencias = signal<Experiencia[]>([
    {
      id: 1,
      nombre: 'Cata Premium de Mezcal',
      fecha: '2024-02-15',
      hora: '18:00',
      descripcion: 'Degustación de mezcales artesanales de Oaxaca',
      asistentes: [],
      creadoEn: new Date()
    }
  ]);

  private asistentes = signal<Asistente[]>([
    { id: 1, nombre: 'María López', correo: 'maria@example.com', estado: 'pendiente', experienciaId: 1, fechaSolicitud: new Date() },
    { id: 2, nombre: 'Juan Pérez', correo: 'juan@example.com', estado: 'pendiente', experienciaId: 1, fechaSolicitud: new Date() }
  ]);

  // CRUD Experiencias
  getExperiencias() {
    return this.experiencias.asReadonly();
  }

  getExperienciaById(id: number) {
    return this.experiencias().find(exp => exp.id === id);
  }

  agregarExperiencia(experiencia: Omit<Experiencia, 'id' | 'creadoEn' | 'asistentes'>) {
    const nuevaExperiencia: Experiencia = {
      ...experiencia,
      id: this.generarNuevoId(),
      creadoEn: new Date(),
      asistentes: []
    };
    this.experiencias.update(exp => [...exp, nuevaExperiencia]);
  }

  actualizarExperiencia(id: number, experiencia: Partial<Experiencia>) {
    this.experiencias.update(exp => 
      exp.map(e => e.id === id ? { ...e, ...experiencia } : e)
    );
  }

  eliminarExperiencia(id: number) {
    if (confirm('¿Eliminar esta experiencia?')) {
      this.experiencias.update(exp => exp.filter(e => e.id !== id));
      this.asistentes.update(asist => asist.filter(a => a.experienciaId !== id));
    }
  }

  // CRUD Asistentes
  getAsistentes() {
    return this.asistentes.asReadonly();
  }

  getAsistentesPorExperiencia(experienciaId: number) {
    return this.asistentes().filter(asist => asist.experienciaId === experienciaId);
  }

  aprobarRechazarAsistente(asistenteId: number, nuevoEstado: 'aprobada' | 'rechazada') {
    this.asistentes.update(asist => 
      asist.map(a => a.id === asistenteId ? { ...a, estado: nuevoEstado } : a)
    );
  }

  private generarNuevoId(): number {
    const ids = this.experiencias().map(exp => exp.id);
    return Math.max(...ids, 0) + 1;
  }
}
