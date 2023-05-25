import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalType } from 'src/app/models/modal.model';
import { Note } from 'src/app/models/note.model';
import { Params } from 'src/app/models/request.model';
import { Word } from 'src/app/models/word.model';
import { ModalService } from 'src/app/services/modal.service';
import { NoteService } from 'src/app/services/note.service';
import { WordService } from 'src/app/services/word.service';
import { NoteFormComponent } from 'src/app/shared/components/forms/note-form/note-form.component';
import { WordFormComponent } from 'src/app/shared/components/forms/word-form/word-form.component';

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
  params: Params = { q: '', skip: 0, limit: 20 };
  loading = false;

  constructor(
    private wordService: WordService,
    private noteService: NoteService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadInfo();
  }

  openModal() {
    this.modalService.openModal(NoteFormComponent,
      {
        title: this.showNotes ? 'Add Note' : 'Add Word',
        type: this.showNotes ? ModalType.Note : ModalType.Word,
        confirmButton: true,
      }
    );
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

    serviceFunction.subscribe((dataRaw: unknown) => {
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

      if (this.listItems.length > 0 && this.params.skip > 0) {
        this.totalShowedItems = this.params.limit * (this.params.skip + 1);
        this.totalItems = listItemsTotal;
        if (this.totalShowedItems > this.totalItems)
          this.totalShowedItems = this.totalItems;
      } else {
        this.totalShowedItems = listItems.length;
        this.totalItems = listItemsTotal;
      }
      this.loading = false;
    });
  }

  searchHandler(query: string) {
    this.clearSeach(query);
  }

  showMore() {
    this.params.skip += 1;
    this.loadInfo();
  }

  clearSeach(q = '') {
    this.params = { q: q, skip: 0, limit: 20 };
    this.listItems = [];
    this.totalItems = 0;
    this.totalShowedItems = 0;
    this.loadInfo();
  }

  changeShowNotes() {
    this.clearSeach(this.params.q);
  }
}
