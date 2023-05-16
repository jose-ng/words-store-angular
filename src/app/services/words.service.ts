import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import URL_API from '../utils/Env';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}

  getWords(q: string) {
    let params = new HttpParams();
    params = params.set('q', q);
    return this.http.get(`${URL_API}/word`, { params });
  }
}
