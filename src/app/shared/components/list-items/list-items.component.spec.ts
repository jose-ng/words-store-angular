import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemsComponent } from './list-items.component';
import { By } from '@angular/platform-browser';
import { Word } from 'src/app/models/word.model';

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a <li> tag with text 'Value'", () => {
    // Arrange
    const expectValue: Word[] = [
      { text_es: 'Valor', text_en: 'Value', id: '0', rating: 20 },
    ];
    component.listItems = [...expectValue];
    const listItemsDebug = fixture.debugElement;
    const liDebug = listItemsDebug.query(By.css('ul'));
    const liEl = liDebug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(liEl).toBeTruthy();
    expect(liEl.textContent).toContain(expectValue[0].text_en);
  });
});
