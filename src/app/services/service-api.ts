import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPI {
  private urlInfoHome = 'http://localhost:3000/info-home';
  constructor(private http: HttpClient) { }
  findAllInfoHome(): Observable<any> {
    return this.http.get(`${this.urlInfoHome}/findAll`);
  }
}
