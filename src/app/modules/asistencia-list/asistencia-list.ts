import { ChangeDetectionStrategy, Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

interface Asistente {
  id: number;
  nombre: string;
  correo: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
   fechaSolicitud: Date; 
  experienciaId: number;
} 

interface Experiencia {
  id: number;
  nombre: string;
  fecha: string;
  hora: string;
  descripcion: string;
  creadoEn: Date;
}


@Component({
  selector: 'app-asistencia-list',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './asistencia-list.html',
  styleUrl: './asistencia-list.css'
})

export class AsistenciaList {
    private fb = inject(FormBuilder);
    experiencias = signal<Experiencia[]>([]);

    asistentes = signal<Asistente[]>([]);
    experiencia = signal<Experiencia | null>(null);

    currentView = signal<'list' | 'form'>('list');
    selectedExperienciaId = signal<number | null>(null);
    menuAbierto = signal(false);

    experienciaForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    descripcion: ['']
    });

    isEditMode = computed(() => this.selectedExperienciaId() !== null);

  experienciaEditando = signal<Experiencia | null>(null);
  
  asistentesParaExperiencia = computed(() => {
    const experiencia = this.experienciaEditando();
    if (!experiencia) return [];
    
    return this.asistentes().filter(a => a.experienciaId === experiencia.id);
  });

  getAsistentesAprobados(experienciaId: number) {
    return this.asistentes().filter(a => a.experienciaId === experienciaId && a.estado === 'aprobada');
  }

  getAsistentesPendientes(experienciaId: number) {
    return this.asistentes().filter(a => a.experienciaId === experienciaId && a.estado === 'pendiente');
  }

  // Output events (en un caso real)
  onAprobarAsistente = signal<(asistente: Asistente) => void>(() => {});
  onRechazarAsistente = signal<(asistente: Asistente) => void>(() => {});
  onVolverGestion = signal<() => void>(() => {});

  // Métodos del componente
  aprobarAsistente(asistente: Asistente): void {
    this.onAprobarAsistente()(asistente);
  }

  rechazarAsistente(asistente: Asistente): void {
    this.onRechazarAsistente()(asistente);
  }

    onGuardarExperiencia = signal<(experiencia: Omit<Experiencia, 'id' | 'creadoEn'> & { id?: number }) => void>(() => {});
  onEliminarExperiencia = signal<(id: number) => void>(() => {});
  onVerAsistentes = signal<(id: number) => void>(() => {});

  navegarALista(): void {
    this.currentView.set('list');
    this.selectedExperienciaId.set(null);
    this.experienciaForm.reset();
  }

  navegarAFormulario(): void {
    this.currentView.set('form');
    this.selectedExperienciaId.set(null);
    this.experienciaForm.reset();
  }

  navegarAEdicion(id: number): void {
    const exp = this.experiencias().find(e => e.id === id);
    if (exp) {
      this.experienciaForm.patchValue(exp);
      this.selectedExperienciaId.set(id);
      this.currentView.set('form');
    }
  }

   getAsistentesPorExperiencia(experienciaId: number) {
    return this.asistentes().filter(a => a.experienciaId === experienciaId);
  }

  guardarExperiencia(): void {
    if (!this.experienciaForm.valid) return;

    const formValue = this.experienciaForm.value as Omit<Experiencia, 'id' | 'creadoEn'>;
    
    if (this.isEditMode()) {
      const experiencia = {
        ...formValue,
        id: this.selectedExperienciaId()!
      };
      this.onGuardarExperiencia()(experiencia);
    } else {
      this.onGuardarExperiencia()(formValue);
    }
    
    this.navegarALista();
  }

  eliminarExperiencia(id: number): void {
    this.onEliminarExperiencia()(id);
  }

  verAsistentes(id: number): void {
    this.onVerAsistentes()(id);
  }

    volverGestion(): void {
    this.onVolverGestion()();
  }

}
