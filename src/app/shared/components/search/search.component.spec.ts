import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a <input> tag with a placeholder: Search for...', () => {
    // Agnóstico a la plataforma
    const searchDebug = fixture.debugElement;
    const inputDebug = searchDebug.query(By.css('input'));
    const inputEl = inputDebug.nativeElement;
    expect(inputEl).toBeTruthy();
    expect(inputEl.placeholder).toEqual('Search for...');
  });

  it('should have input with text "test"', () => {
    // Arrange
    const searchQuery = 'test';
    const searchDebug = fixture.debugElement;
    const inputDebug = searchDebug.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDebug.nativeElement;
    // Act
    inputEl.value = searchQuery;
    inputEl.dispatchEvent(new Event('input')); // useful for use the ngModel
    fixture.detectChanges();
    // Assert
    expect(inputEl.value).toContain(searchQuery);
    expect(component.searchQuery).toContain(searchQuery);
  });

  it('should click on the search button close', () => {
    // Arrange
    const searchQuery = 'test';
    const searchDebug = fixture.debugElement;
    const inputDebug = searchDebug.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDebug.nativeElement;
    inputEl.value = searchQuery;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const buttonDebug = searchDebug.query(By.css('button'));
    const buttonEl = buttonDebug.nativeElement;
    // Act
    expect(component.searchQuery).toContain(searchQuery);
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(buttonEl).toBeTruthy();
    expect(component.searchQuery).toBe('');
  });

  it('should return a search query text', () => {
    // Arrange
    const searchQuery = 'test';
    const searchDebug = fixture.debugElement;
    const inputDebug = searchDebug.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDebug.nativeElement;
    let searchQueryText: string | undefined;
    component.search.subscribe((value) => {
      searchQueryText = value;
    });
    component.searchSubject$.subscribe((query) => {
      component.search.emit(query)
    });
    // Act
    inputEl.value = searchQuery;
    inputEl.dispatchEvent(new Event('input')); // useful for use the ngModel
    component.searchSubject$.next(searchQuery);
    fixture.detectChanges();
    // Assert
    expect(searchQueryText).toContain(searchQuery);
  });
});
