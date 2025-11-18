import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceAPI {

  private baseUrl = 'http://localhost:3000/diaCata'; 
  private urlUsuario = 'http://localhost:3000/usuario';
  private urlInfoHome = 'http://localhost:3000/info-home';
  private urlBebidas = 'http://localhost:3000/bebidas';
  private urlCategorias = 'http://localhost:3000/categoria';
  private urlapartados = 'http://localhost:3000/apartados';

  constructor(private http: HttpClient) {}

  // ============ EXPERIENCIAS ============
  // Método para obtener todos los registros de experiencias
  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/findAll`);
  }

  // Método para obtener una experiencia por ID
  getExperienciaById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findOne/${id}`);
  }

  // Método para crear una nueva experiencia
  postExperiencia(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  // Método para actualizar una experiencia por ID
  patchExperiencia(id: number, data: any): Observable<any> {
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

  // Método para eliminar una experiencia por ID
  deleteExperiencia(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' as 'json' }).pipe(
      catchError((err) => {
        if (err?.status === 404) {
          // Primera alternativa: DELETE /diaCata/remove/{id}
          return this.http.delete(`${this.baseUrl}/remove/${id}`, { responseType: 'text' as 'json' }).pipe(
            catchError((err2) => {
              if (err2?.status === 404) {
                // Segunda alternativa: DELETE /diaCata/{id}
                return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' as 'json' });
              }
              return throwError(() => err2);
            })
          );
        }
        return throwError(() => err);
      })
    );
  }

  // ============ BEBIDAS / PRODUCTOS ============
  findAllBebidas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlBebidas}/findAll`);
  }

  // Metodo para obtener una bebida por ID
  getBebidaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBebidas}/findOne/${id}`);
  }

  // Metodo para crear una nueva bebida
  postBebida(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlBebidas}/create`, data);
  }

  // Metodo para actualizar una bebida por ID
  patchBebida(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.urlBebidas}/update/${id}`, data);
  }

  // Metodo para eliminar una bebida por ID
  deleteBebida(id: number): Observable<any> {
    return this.http.delete(`${this.urlBebidas}/delete/${id}`, { responseType: 'text' as 'json' });
  }

  // ============ CATEGORÍAS ============
  // metodo para obtener todas las categorias de la BD
  findAllCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlCategorias}/findAll`);
  }

  // metodo para obtener bebidas por categoria (usando nombre de categoría)
  getBebidasByCategoria(categoriaNombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlBebidas}/byCategoria/${categoriaNombre}`);
  }

  // ============ INFO HOME ============
  findAllInfoHome(): Observable<any> {
    return this.http.get(`${this.urlInfoHome}/findAll`);
  }

  //Metodo para actualizar info home
  patchInfoHome(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.urlInfoHome}/update/${id}`, data);
  }

  // ============ USUARIOS ============
  // Método para obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(this.urlUsuario);
  }

  // Método para crear un usuario
  createUsuario(data: any): Observable<any> {
    return this.http.post(this.urlUsuario, data);
  }

  // metodo para editar usuario
  patchUsuario(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.urlUsuario}/${id}`, data);
  }

  // Método para obtener un usuario por ID de la experiencia
  getUsuarioByExperienciaId(experienciaId: number): Observable<any> {
    return this.http.get(`${this.urlUsuario}/visita/${experienciaId}`);
  }

  // ============ APARTADOS ============
  findAllApartados(): Observable<any> {
    return this.http.get(`${this.urlapartados}`);
  }

  createApartado(data: any): Observable<any> {
    return this.http.post(`${this.urlapartados}`, data);
  }
}
