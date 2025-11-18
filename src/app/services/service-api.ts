import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPI {
  private urlInfoHome = 'http://localhost:3000/info-home';
  private urlBebidas = 'http://localhost:3000/bebidas';
  private urlapartados = 'http://localhost:3000/apartados';
  private urlUsuario = 'http://localhost:3000/usuario';
  private baseUrl = 'http://localhost:3000/diaCata'; 
  constructor(private http: HttpClient) { }
  findAllInfoHome(): Observable<any> {
    return this.http.get(`${this.urlInfoHome}/findAll`);
  }
  findAllBebidas(): Observable<any> {
    return this.http.get(`${this.urlBebidas}/findAll`);
  }
  patchBebida(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.urlBebidas}/update/${id}`, data);
  }
    
  findAllApartados(): Observable<any> {
    return this.http.get(`${this.urlapartados}`);
  }
  createApartado(data: any): Observable<any> {
    return this.http.post(`${this.urlapartados}`, data);
  }
  getUsuarios(): Observable<any> {
    return this.http.get(this.urlUsuario);
  }
  createUsuario(data: any): Observable<any> {
    return this.http.post(this.urlUsuario, data);
  }
  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/findAll`);
  }
  // Método para actualizar una experiencia por ID
  patchExperiencia(id: number, data: any): Observable<any> {
    // Intentamos el endpoint más probable y, si devuelve 404, probamos alternativas.
    return this.http.patch(`${this.baseUrl}/update/${id}`, data).pipe(
      catchError((err) => {
        console.warn('patchExperiencia: primary endpoint failed', err?.status);
        if (err?.status === 404) {
          // Fallback 1: PATCH /diaCata/{id}
          return this.http.patch(`${this.baseUrl}/${id}`, data).pipe(
            catchError((err2) => {
              console.warn('patchExperiencia: fallback 1 failed', err2?.status);
              // Fallback 2: PATCH /diaCata/update (id en body)
              return this.http.patch(`${this.baseUrl}/update`, { id, ...data }).pipe(
                catchError((err3) => {
                  console.error('patchExperiencia: all attempts failed');
                  return throwError(() => err3);
                })
              );
            })
          );
        }
        return throwError(() => err);
      })
    );
  }

}
