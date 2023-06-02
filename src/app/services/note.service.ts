import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../models/request.model';
import { CreateNoteDTO, Note } from '../models/note.model';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  updateRating(dto: { id: string; rating: number }) {
    const tokenAuth = this.tokenService.getToken();
    let headers = new HttpHeaders();
    const token = tokenAuth?.token;
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.post<Note>(
      `${environment.API_URL}/note/updateRating`,
      dto,
      { headers }
    );
  }

  create(dto: CreateNoteDTO) {
    const tokenAuth = this.tokenService.getToken();
    let headers = new HttpHeaders();
    const token = tokenAuth?.token;
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.post<Note>(`${environment.API_URL}/note`, dto, {
      headers,
    });
  }

  getNotes(p: Params) {
    const params = new HttpParams({ fromObject: { ...p } });
    return this.http.get<{ notes: Note[]; totalNotes: number }>(
      `${environment.API_URL}/note`,
      { params }
    );
  }
}
