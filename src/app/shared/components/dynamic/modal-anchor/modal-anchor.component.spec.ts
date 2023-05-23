import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnchorComponent } from './modal-anchor.component';

describe('ModalAnchorComponent', () => {
  let component: ModalAnchorComponent;
  let fixture: ComponentFixture<ModalAnchorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAnchorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
