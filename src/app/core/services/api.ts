import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Api { 
  // URLs de tu backend
  private baseUrl = 'http://localhost:3000/diaCata'; 
  private urlUsuario = 'http://localhost:3000/usuario';
  private urlInfoHome = 'http://localhost:3000/info-home';
  private urlBebidas = 'http://localhost:3000/bebidas';
  private urlCategorias = 'http://localhost:3000/categoria';

  constructor(private http: HttpClient) {}

  // ===================================
  // --- MÉTODOS DE EXPERIENCIAS (diaCata) ---
  // ===================================

  // Método para obtener todos los registros de experiencias
  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/findAll`);
  }
  
  // Método para obtener una experiencia por ID
  getExperienciaById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findOne/${id}`);
  }

  // Método para crear una experiencia
  postExperiencia(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  // Método para actualizar una experiencia por ID (Mantiene lógica de fallback)
  patchExperiencia(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/update/${id}`, data).pipe(
      catchError((err) => {
        return this.http.patch(`${this.baseUrl}/${id}`, data).pipe(
          catchError((err2) => {
            // Fallback 2: PATCH /diaCata/update (id en body)
            return this.http.patch(`${this.baseUrl}/update`, { id, ...data }).pipe(
              catchError((err3) => {
                console.error('patchExperiencia: all attempts failed');
                return throwError(() => err3);
              })
            );
          })
        );
      })
    );
  }

  deleteExperiencia(id: number): Observable<any> {
    const options = { responseType: 'text' as 'json' };
    
    return this.http.delete(`${this.baseUrl}/delete/${id}`, options).pipe(
      catchError((err) => {
        // Primera alternativa: DELETE /diaCata/remove/{id}
        return this.http.delete(`${this.baseUrl}/remove/${id}`, options).pipe(
          catchError((err2) => {
            // Segunda alternativa: DELETE /diaCata/{id}
            return this.http.delete(`${this.baseUrl}/${id}`, options).pipe(
              catchError((err3) => {
                return throwError(() => err3);
              })
            );
          })
        );
      })
    );
  }

  // ===================================
  // --- MÉTODOS DE BEBIDAS ---
  // ===================================

  // Metodo para obtener todas las bebidas
  findAllBebidas():Observable<any> {
    return this.http.get(`${this.urlBebidas}/findAll`);
  }
  
  // Metodo para obtener una bebida por ID
  getBebidaById(id: number): Observable<any> {
    return this.http.get(`${this.urlBebidas}/findOne/${id}`);
  }
  
  // Metodo para actualizar una bebida por ID
  patchBebida(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.urlBebidas}/update/${id}`, data);
  }
  
  // Metodo para crear una nueva bebida
  postBebida(data: any): Observable<any> {
    return this.http.post(`${this.urlBebidas}/create`, data);
  }
  
  // Metodo para eliminar una bebida por ID
  deleteBebida(id: number): Observable<any> {
    return this.http.delete(`${this.urlBebidas}/delete/${id}`, { responseType: 'text' as 'json' });
  }
  
  //metodo para obtener bebidas por categoria
  getBebidasByCategoria(categoriaId: number): Observable<any> {
    return this.http.get(`${this.urlBebidas}/byCategoria/${categoriaId}`);
  }

  // ===================================
  // --- MÉTODOS DE CATEGORIAS (CORREGIDOS Y COMPLETADOS) ---
  // ===================================

  // Metodo para obtener todas las categorias
  findAllCategorias():Observable<any> {
    return this.http.get(`${this.urlCategorias}/findAll`);
  }
  
  // Método para obtener una categoría por ID (AÑADIDO)
  getCategoriaById(id: number): Observable<any> {
    return this.http.get(`${this.urlCategorias}/findOne/${id}`);
  }

  // Método para crear una nueva categoría (AÑADIDO)
  postCategoria(data: any): Observable<any> {
    return this.http.post(`${this.urlCategorias}/create`, data);
  }

  // Método para actualizar una categoría por ID (AÑADIDO)
  patchCategoria(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.urlCategorias}/update/${id}`, data);
  }

  // Método para eliminar una categoría por ID (AÑADIDO)
  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.urlCategorias}/delete/${id}`, { responseType: 'text' as 'json' });
  }

  // ===================================
  // --- MÉTODOS DE INFO-HOME (COMPLETADOS) ---
  // ===================================

  // Metodo para obtener toda la info home
  findAllInfoHome(): Observable<any> {
    return this.http.get(`${this.urlInfoHome}/findAll`);
  }
  
  // Método para obtener un registro de Info Home por ID (AÑADIDO)
  getInfoHomeById(id: number): Observable<any> {
    return this.http.get(`${this.urlInfoHome}/findOne/${id}`);
  }
  
  //Metodo para actualizar info home
  patchInfoHome(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.urlInfoHome}/update/${id}`, data);
  }
  
  // Método para crear un registro de Info Home (AÑADIDO)
  postInfoHome(data: any): Observable<any> {
    return this.http.post(`${this.urlInfoHome}/create`, data);
  }

  // Método para eliminar un registro de Info Home por ID (AÑADIDO)
  deleteInfoHome(id: number): Observable<any> {
    return this.http.delete(`${this.urlInfoHome}/delete/${id}`, { responseType: 'text' as 'json' });
  }

  // ===================================
  // --- MÉTODOS DE USUARIOS (CORREGIDOS Y COMPLETADOS) ---
  // ===================================

  // Método para obtener todos los usuarios (CORREGIDO para ser consistente con /findAll)
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.urlUsuario}/findAll`);
  }
  
  // Método para obtener un usuario por ID (AÑADIDO)
  getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${this.urlUsuario}/findOne/${id}`);
  }
  
  // Método para obtener un usuario por ID de la experiencia
  getUsuarioByExperienciaId(experienciaId: number): Observable<any> {
    return this.http.get(`${this.urlUsuario}/visita/${experienciaId}`);
  }
  
  // metodo para editar usuario
  patchUsuario(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.urlUsuario}/${id}`, data);
  }

  // Método para crear un nuevo usuario (AÑADIDO)
  postUsuario(data: any): Observable<any> {
    return this.http.post(`${this.urlUsuario}/create`, data);
  }
  
  // Método para eliminar un usuario por ID (AÑADIDO)
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.urlUsuario}/delete/${id}`, { responseType: 'text' as 'json' });
  }
}