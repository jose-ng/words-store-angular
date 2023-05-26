import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { WordsService } from 'src/app/services/word.service';
import { generateManyWords } from 'src/app/models/word.mock';
import { of } from 'rxjs';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let wordsService: jasmine.SpyObj<WordsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WordsService', ['getWords']);
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, SearchComponent, ListItemsComponent],
      providers: [WordsService, { provide: WordsService, useValue: spy }],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    wordsService = TestBed.inject(WordsService) as jasmine.SpyObj<WordsService>;

    const wordsMock = { words: generateManyWords(), totalWords: 10 };
    wordsService.getWords.and.returnValue(of(wordsMock));
    fixture.detectChanges(); // ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
