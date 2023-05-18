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
  totalWords = 0;
  params: Params = { q: '', skip: 0, limit: 20 };

  constructor(private wordService: WordsService) {}

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    this.wordService.getWords(this.params).subscribe((data) => {
      this.words = data.words;
      this.totalWords = data.totalWords;
    });
  }

  searchHandler(query: string) {
    this.params.q = query;
    this.loadInfo();
  }
}
