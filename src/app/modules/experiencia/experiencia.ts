import { CommonModule } from '@angular/common';
import { FormBuilder,Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, computed, signal, inject, input, output } from '@angular/core';

export interface Experiencia {
  id: number;
  nombre: string;
  fecha: string; 
  hora: string; 
  descripcion: string;
  creadoEn: Date;
}

export interface Asistente {
  id: number;
  nombre: string;
  correo: string;
  estado: string;
  experienciaId: number;
  fechaSolicitud: Date;
}
@Component({
  selector: 'app-experiencia',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './experiencia.html',
  styleUrl: './experiencia.css'
})
export class Experiencia {
  private fb = inject(FormBuilder);
   
  // Input signals
  experiencias = input.required<Experiencia[]>();
  asistentes = input.required<Asistente[]>();
  
  // Estado del componente
  currentView = signal<'list' | 'form'>('list');
  selectedExperienciaId = signal<number | null>(null);
  menuAbierto = signal(false);

  // Formulario
  experienciaForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    descripcion: ['']
  });

  // Computed properties
  isEditMode = computed(() => this.selectedExperienciaId() !== null);
  
  experienciaEditando = computed((): Experiencia | null => {
    const id = this.selectedExperienciaId();
    return id ? this.experiencias().find(exp => exp.id === id) || null : null;
  });

  // Output events
  guardarExperiencia = output<{ experiencia: Omit<Experiencia, 'id' | 'creadoEn'>; id?: number }>();
  eliminarExperiencia = output<number>();
  verAsistentes = output<number>();
  volverGestion = output<void>();

  // Métodos de navegación
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
      this.experienciaForm.patchValue({
        nombre: exp.nombre,
        fecha: exp.fecha,
        hora: exp.hora,
        descripcion: exp.descripcion
      });
      this.selectedExperienciaId.set(id);
      this.currentView.set('form');
    }
  }

  // Métodos de ayuda
  getAsistentesPorExperiencia(experienciaId: number) {
    return this.asistentes().filter(a => a.experienciaId === experienciaId);
  }

  getAsistentesAprobados(experienciaId: number) {
    return this.getAsistentesPorExperiencia(experienciaId).filter(a => a.estado === 'aprobada');
  }

  // CRUD
  guardar(): void {
    if (!this.experienciaForm.valid) return;

    const formValue = this.experienciaForm.value as Omit<Experiencia, 'id' | 'creadoEn'>;
    
    if (this.isEditMode()) {
      this.guardarExperiencia.emit({
        experiencia: formValue,
        id: this.selectedExperienciaId()!
      });
    } else {
      this.guardarExperiencia.emit({
        experiencia: formValue
      });
    }
    
    this.navegarALista();
  }

  eliminar(id: number): void {
    this.eliminarExperiencia.emit(id);
  }

  verAsistentesDeExperiencia(id: number): void {
    this.verAsistentes.emit(id);
  }

  volver(): void {
    this.volverGestion.emit();
  }

  toggleMenu(): void {
    this.menuAbierto.update(v => !v);
  }

  cerrarMenu(): void {
    this.menuAbierto.set(false);
  }
}


