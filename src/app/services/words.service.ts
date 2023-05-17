import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Words } from '../models/words';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}

  getWords(q: string) {
    let params = new HttpParams();
    params = params.set('q', q);
    return this.http.get<Words[]>(`${environment.API_URL}/word`, { params });
  }
}
