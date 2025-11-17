import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPI {
  private urlInfoHome = 'http://localhost:3000/info-home';
  private urlBebidas = 'http://localhost:3000/bebidas';
  private urlapartados = 'http://localhost:3000/apartados';
  private urlUsuario = 'http://localhost:3000/usuario';
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
}
