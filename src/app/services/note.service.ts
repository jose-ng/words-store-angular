import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../models/request.model';
import { CreateNoteDTO, Note } from '../models/note.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient) {}

  getNotes(p: Params) {
    const params = new HttpParams({ fromObject: { ...p } });
    return this.http.get<{ notes: Note[]; totalNotes: number }>(
      `${environment.API_URL}/note`,
      { params }
    );
  }

  create(dto: CreateNoteDTO) {
    return this.http.post<Note>(`${environment.API_URL}/note`, dto);
  }

  updateRating(dto: { id: string; rating: number }) {
    return this.http.post<Note>(
      `${environment.API_URL}/note/updateRating`,
      dto
    );
  }
}
