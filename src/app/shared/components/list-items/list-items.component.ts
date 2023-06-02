import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  OnInit,
} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { Word } from 'src/app/models/word.model';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnChanges, OnInit {
  words: Word[] = [];
  notes: Note[] = [];

  @Input() showNotes = false;
  @Input() listItems: Word[] | Note[] = [];
  @Output() updateRating = new EventEmitter<{
    id: string;
    isNote: boolean;
    rating: number;
  }>();
  @Input() loading = false;
  userIsLoggedIn = false;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    const tokenAuth = this.tokenService.getToken();
    this.userIsLoggedIn = tokenAuth?.user ? true : false;
  }

  ngOnChanges(): void {
    if (!this.showNotes) this.words = this.listItems as Word[];
    else this.notes = this.listItems as Note[];
  }

  updateRatingInput(item: Word | Note, rating: number, isNote: boolean) {
    item.rating += rating;
    this.updateRating.emit({ id: item.id, isNote, rating });
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
