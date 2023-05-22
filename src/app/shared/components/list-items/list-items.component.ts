import { Component, Input, OnChanges } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { Word } from 'src/app/models/word.model';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnChanges {
  words: Word[] = [];
  notes: Note[] = [];

  @Input() showNotes = false;
  @Input() listItems: Word[] | Note[] = [];
  @Input() totalShowedItems = 0;
  @Input() totalItems = 0;

  ngOnChanges(): void {
    if (!this.showNotes) this.words = this.listItems as Word[];
    else this.notes = this.listItems as Note[];
  }

  showDetailItem(item: Word | Note, newValueForHideAllText: boolean) {
    if (!this.showNotes)
      this.words = this.words.map((word: Word) => {
        return {
          ...word,
          hideAllText:
            word.id === item.id ? newValueForHideAllText : word.hideAllText,
        };
      });
    else
      this.notes = this.notes.map((note: Note) => {
        return {
          ...note,
          hideAllText:
            note.id === item.id ? newValueForHideAllText : note.hideAllText,
        };
      });
  }
}
