import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateWordDTO, Word } from '../models/word.model';
import { Params } from '../models/request.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  updateRating(dto: { id: string; rating: number }) {
    const tokenAuth = this.tokenService.getToken();
    let headers = new HttpHeaders();
    const token = tokenAuth?.token;
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post<Word>(
      `${environment.API_URL}/word/updateRating`,
      dto,
      { headers }
    );
  }

  create(dto: CreateWordDTO) {
    const tokenAuth = this.tokenService.getToken();
    let headers = new HttpHeaders();
    const token = tokenAuth?.token;
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post<Word>(`${environment.API_URL}/word`, dto, {
      headers,
    });
  }

  getWords(p: Params) {
    const params = new HttpParams({ fromObject: { ...p } });
    return this.http.get<{ words: Word[]; totalWords: number }>(
      `${environment.API_URL}/word`,
      { params }
    );
  }
}
