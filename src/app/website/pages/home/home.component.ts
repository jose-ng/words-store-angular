import { Component, Type, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import ModalContentBaseComponent from '@models/modal.content.base';
import { Note } from '@models/note.model';
import { Params } from '@models/request.model';
import { Word } from '@models/word.model';
import { ModalService } from '@services/modal.service';
import { NoteService } from '@services/note.service';
import { TokenService } from '@services/token.service';
import { WordService } from '@services/word.service';
import { NoteFormComponent } from '@shared/components/forms/note-form/note-form.component';
import { WordFormComponent } from '@shared/components/forms/word-form/word-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listItems: Word[] | Note[] = [];
  totalItems = 0;
  showNotes = false;
  totalShowedItems = 0;
  params: Params = { query: "a", skip: 0, limit: 100 };
  loading = false;
  userIsLoggedIn = false;

  constructor(
    private wordService: WordService,
    private noteService: NoteService,
    private modalService: ModalService,
    private tokenService: TokenService
  ) {
    this.modalService.dataReceived.subscribe(() => {
      this.clearSeach();
    });
  }
  ngOnInit(): void {
    const tokenAuth = this.tokenService.getToken();
    this.userIsLoggedIn = tokenAuth?.user ? true : false;
  }

  openModal() {
    const component = (
      this.showNotes ? NoteFormComponent : WordFormComponent
    ) as Type<ModalContentBaseComponent>;
    this.modalService.openModal(component);
  }

  loadInfo() {
    this.loading = true;
    let serviceFunction: Observable<
      | { words: Word[]; totalWords: number }
      | { notes: Note[]; totalNotes: number }
    >;
    if (!this.showNotes) {
      serviceFunction = this.wordService.getWords(this.params);
    } else {
      serviceFunction = this.noteService.getNotes(this.params);
    }

    serviceFunction.subscribe(
      (dataRaw: unknown) => {
        const data = dataRaw as
          | { words: Word[]; totalWords: number }
          | { notes: Note[]; totalNotes: number };

        const listItems =
          !this.showNotes && 'words' in data
            ? data.words
            : 'notes' in data
              ? data.notes
              : [];

        const listItemsTotal =
          !this.showNotes && 'words' in data
            ? data.totalWords
            : 'notes' in data
              ? data.totalNotes
              : 0;

        this.listItems = !this.showNotes
          ? ([
            ...this.listItems,
            ...listItems.map((item) => {
              return {
                ...item,
                hideAllText: true,
              };
            }),
          ] as Word[])
          : ([
            ...this.listItems,
            ...listItems.map((item) => {
              return {
                ...item,
                hideAllText: true,
              };
            }),
          ] as Note[]);

        if (this.listItems.length > 0 && this.params.skip! > 0) {
          this.totalShowedItems = this.params.limit! * (this.params.skip! + 1);
          this.totalItems = listItemsTotal;
          if (this.totalShowedItems > this.totalItems)
            this.totalShowedItems = this.totalItems;
        } else {
          this.totalShowedItems = listItems.length;
          this.totalItems = listItemsTotal;
        }
        this.loading = false;
      },
      (err) => {
        // alert(err);
      }
    );
  }

  searchHandler(query: string) {
    this.clearSeach(query);
  }

  showMore() {
    this.params.skip! += 1;
    this.loadInfo();
  }

  clearSeach(q = '') {
    this.params = { query: q, skip: 0, limit: 100 };
    this.listItems = [];
    this.totalItems = 0;
    this.totalShowedItems = 0;
    this.loadInfo();
  }

  changeShowNotes() {
    this.clearSeach(this.params.query);
  }

  updateNotesHandler(dto: { id: string; isNote: boolean; rating: number }) {
    this.loading = true;
    let serviceFunction: Observable<Word | Note>;
    const { id, isNote, rating } = dto;

    if (!isNote) {
      serviceFunction = this.wordService.updateRating({ id, rating });
    } else {
      serviceFunction = this.noteService.updateRating({ id, rating });
    }
    serviceFunction.subscribe((dataRaw: unknown) => {
      const data = dataRaw as Word | Note;
      console.log(data);
      this.loading = false;
    });
  }
}
