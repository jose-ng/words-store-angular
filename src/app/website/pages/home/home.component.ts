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
  params: Params = { q: '', skip: 0, limit: 20 };

  constructor(private wordService: WordsService) {}

  ngOnInit(): void {
    // this.wordService.getWords(this.params).subscribe((words) => {
    //   this.words = words;
    //   console.log(
    //     '🚀 ~ file: home.component.ts:16 ~ HomeComponent ~ this.wordService.getWords ~ words:',
    //     words
    //   );
    // });
    console.log(1);
  }

  searchHandler(query: string) {
    this.params.q = query;
  }
}
