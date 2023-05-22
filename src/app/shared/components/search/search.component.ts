import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  searchQuery = '';
  searchSubject$: Subject<string> = new Subject<string>();
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<boolean>();
  @ViewChild('searchCtrl') searchCtrl!: ElementRef;

  constructor() {
    this.searchSubject$.pipe(debounceTime(300)).subscribe((query) => {
      // Call search function or service method here
      this.search.emit(query);
    });
  }
  ngAfterViewInit(): void {
    this.searchCtrl.nativeElement.focus();
  }

  searchInput() {
    this.searchSubject$.next(this.searchQuery);
  }

  clearInput() {
    this.searchQuery = '';
    this.clear.emit(true);
  }
}
