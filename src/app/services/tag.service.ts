import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  // La URL base debe coincidir con la de tu backend
  private apiUrl = 'http://localhost:9000/api/tags';

  constructor(private http: HttpClient) { }

  // Crear una nueva etiqueta
  createTag(tag: ITag): Observable<ITag> {
    return this.http.post<ITag>(`${this.apiUrl}/create`, tag);  // Se usa backticks (`) para las plantillas de literales
  }

  // Obtener todas las etiquetas
  getAllTags(page: number = 1, limit: number = 10, search: string = ''): Observable<ITag[]> {
    const params = { page: page.toString(), limit: limit.toString(), search };
    return this.http.get<ITag[]>(this.apiUrl, { params });
  }

  // Obtener una etiqueta por ID
  getTagById(id: string): Observable<ITag> {
    return this.http.get<ITag>(`${this.apiUrl}/${id}`);  // Se usa backticks (`) para las plantillas de literales
  }

  // Actualizar una etiqueta
  updateTag(id: string, tagData: Partial<ITag>): Observable<ITag> {
    return this.http.put<ITag>(`${this.apiUrl}/update/${id}`, tagData);  // Se usa backticks (`) para las plantillas de literales
  }

  // Eliminar una etiqueta (borrado lógico)
  deleteTag(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);  // Se usa backticks (`) para las plantillas de literales
  }
}
