import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder,Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienciaService } from '../../../app/services/experiencia.service';

@Component({
  selector: 'app-experiencia',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './experiencia.html',
  styleUrl: './experiencia.css'
})
export class Experiencia {
  experienciaForm: FormGroup;
  esEdicion = false;
  menuAbierto = false;
  experienciaId?: number;
  experiencias: Experiencia[] = [];

  constructor(private fb: FormBuilder ) {
    this.experienciaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      descripcion: ['']
    });
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  guardar(): void {
    console.log('Guardar sin funcionalidad aún');
  }

  verAsistentes(): void {
    console.log('Ver asistentes (sin funcionalidad aún)');
  }

   eliminar(): void {
    console.log('Eliminar (sin funcionalidad aún)');
  }

  cancelar(): void {
    console.log('Cancelar acción');
  }
}

