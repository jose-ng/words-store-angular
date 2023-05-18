import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchQuery = '';
  searchSubject$: Subject<string> = new Subject<string>();
  @Output() search = new EventEmitter<string>();

  constructor() {
    this.searchSubject$.pipe(debounceTime(300)).subscribe((query) => {
      // Call search function or service method here
      this.search.emit(query);
    });
  }

  searchInput() {
    this.searchSubject$.next(this.searchQuery);
  }
}
