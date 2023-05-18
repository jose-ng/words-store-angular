import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Word } from '../models/word.model';
import { Params } from '../models/request.model';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}

  getWords(p: Params) {
    const params = new HttpParams({ fromObject: { ...p } });
    return this.http.get<Word[]>(`${environment.API_URL}/word`, { params });
  }
}
