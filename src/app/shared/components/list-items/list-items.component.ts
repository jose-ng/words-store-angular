import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.showNotes) this.words = this.listItems as Word[];
    else this.notes = this.listItems as Note[];
  }
}
