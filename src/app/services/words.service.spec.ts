import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WordsService } from './words.service';
import { Words } from '../models/words';
import { environment } from 'src/environments/environment';
import { generateManyWords } from '../models/word.mock';

fdescribe('WordsService', () => {
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
      const mockData: Words[] = generateManyWords();
      // Act
      service.getWords('Valor').subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/word?q=Valor`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
