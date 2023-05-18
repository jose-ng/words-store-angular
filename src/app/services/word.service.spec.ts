import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WordsService } from './word.service';
import { Word } from '../models/word.model';
import { environment } from 'src/environments/environment';
import { generateManyWords } from '../models/word.mock';

describe('WordsService', () => {
  let service: WordsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WordsService],
    });
    service = TestBed.inject(WordsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for getWords', () => {
    it('should return any length', (doneFn) => {
      // Arrange
      const mockData: Word[] = generateManyWords();
      // Act
      const params = { q: 'Valor', skip: 0, limit: 20 };
      service.getWords(params).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/word?q=Valor&skip=0&limit=20`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
