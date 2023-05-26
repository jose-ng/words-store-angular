import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WordService } from './word.service';
import { environment } from 'src/environments/environment';
import { generateManyWords } from '../models/word.mock';

describe('WordsService', () => {
  let service: WordService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WordService],
    });
    service = TestBed.inject(WordService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for getWords', () => {
    it('should return any length', (doneFn) => {
      // Arrange
      const mockData = { words: generateManyWords(), totalItems: 10 };
      // Act
      const params = { q: 'Valor', skip: 0, limit: 20 };
      service.getWords(params).subscribe((data) => {
        // Assert
        expect(data.words.length).toEqual(mockData.words.length);
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
