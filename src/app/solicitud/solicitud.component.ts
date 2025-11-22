import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, finalize } from 'rxjs/operators';
import { ServiceAPI } from '../services/service-api';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class SolicitudComponent  implements OnInit {
  form!: FormGroup;
  catas$!: Observable<any[]>;
  loading = false;
  successMsg = '';
  errorMsg = '';
  selectedCata: any | null = null;

  constructor(private fb: FormBuilder, private api: ServiceAPI, private router: Router) {
    // Verificar si hay una experiencia seleccionada en el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { experienciaSeleccionada?: any };
    if (state?.experienciaSeleccionada) {
      this.selectedCata = state.experienciaSeleccionada;
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      genero: ['masculino', [Validators.required]],
      Idcata: [null, [Validators.required]],
    });
    this.catas$ = this.api.findAll();
    
    // Si hay una experiencia pre-seleccionada, cargarla en el formulario
    if (this.selectedCata) {
      this.form.patchValue({ Idcata: this.selectedCata.id });
    }
  }

  selectCata(cata: any) {
    if ((cata?.capacidad ?? 0) <= 0 || cata?.estado === false) {
      this.errorMsg = 'La cata no tiene capacidad disponible';
      return;
    }
    this.selectedCata = cata;
    this.form.patchValue({ Idcata: cata?.id ?? null });
    this.successMsg = '';
    this.errorMsg = '';
  }

  cambiarCata() {
    this.router.navigate(['/tabs/experiencia']);
  }

  volverAExperiencias() {
    this.router.navigate(['/tabs/experiencia']);
  }

  submit() {
    this.successMsg = '';
    this.errorMsg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.selectedCata) {
      this.errorMsg = 'Primero selecciona un día de cata';
      return;
    }
    if ((this.selectedCata?.capacidad ?? 0) <= 0) {
      this.errorMsg = 'La cata seleccionada no tiene capacidad disponible';
      return;
    }
    const raw = this.form.value;
    const payload = {
      nome: raw.nome,
      email: raw.email,
      telefono: raw.telefono,
      status: 0,
      genero: raw.genero,
      Idcata: Number(raw.Idcata),
    };
    this.loading = true;
    const nextCap = Math.max((this.selectedCata?.capacidad ?? 0) - 1, 0);
    this.api
      .createUsuario(payload)
      .pipe(
        switchMap(() =>
          this.api.patchExperiencia(Number(raw.Idcata), { capacidad: nextCap }).pipe(
            catchError((err) => {
              console.error('PATCH capacidad error:', err);
              // No rompemos el flujo si falla el patch: informamos y continuamos
              this.errorMsg = 'Usuario creado, pero no se actualizó la capacidad';
              return of(null);
            })
          )
        ),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: () => {
          this.successMsg = 'Usuario creado correctamente';
          // Reiniciar al selector de catas y refrescar lista
          this.selectedCata = null;
          this.form.reset({ genero: 'masculino', Idcata: null });
          this.catas$ = this.api.findAll();
        },
        error: (err) => {
          const detail = err?.error?.message || err?.error || err?.statusText || 'Error al crear usuario';
          this.errorMsg = typeof detail === 'string' ? detail : 'Error al crear usuario';
          console.error('POST /usuario error:', err);
          console.log('Payload enviado:', payload);
        },
      });
  }

}