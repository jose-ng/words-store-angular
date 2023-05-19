import { Component, OnInit } from '@angular/core';
import { Params } from 'src/app/models/request.model';
import { Word } from 'src/app/models/word.model';
import { WordsService } from 'src/app/services/word.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  words: Word[] = [];
  totalItems = 0;
  showNotes = false;
  totalShowedItems = 0;
  params: Params = { q: '', skip: 0, limit: 20 };
  loading = false;

  constructor(private wordService: WordsService) {}

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    this.loading = true;
    if (!this.showNotes) {
      this.wordService.getWords(this.params).subscribe((data) => {
        if (this.words.length > 0 && this.params.skip > 0) {
          this.words = [...this.words, ...data.words];
          this.totalShowedItems = this.params.limit * (this.params.skip + 1);
          this.totalItems = data.totalWords;
          if (this.totalShowedItems > this.totalItems)
            this.totalShowedItems = this.totalItems;
        } else {
          this.words = data.words;
          this.totalShowedItems = data.words.length;
          this.totalItems = data.totalWords;
        }
        this.loading = false;
      });
    }
  }

  searchHandler(query: string) {
    this.params.q = query;
    this.loadInfo();
  }

  showMore() {
    this.params.skip += 1;
    this.loadInfo();
  }

  clearSeach() {
    this.params.skip = 0;
    this.loadInfo();
  }
}
