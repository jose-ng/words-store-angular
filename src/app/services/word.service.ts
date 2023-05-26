import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateWordDTO, Word } from '../models/word.model';
import { Params } from '../models/request.model';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor(private http: HttpClient) {}

  getWords(p: Params) {
    const params = new HttpParams({ fromObject: { ...p } });
    return this.http.get<{ words: Word[]; totalWords: number }>(
      `${environment.API_URL}/word`,
      { params }
    );
  }
  create(dto: CreateWordDTO) {
    return this.http.post<Word>(`${environment.API_URL}/word`, dto);
  }
}
