import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WordsService } from './words.service';

describe('WordsService', () => {
  let service: WordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WordsService],
    });
    service = TestBed.inject(WordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
