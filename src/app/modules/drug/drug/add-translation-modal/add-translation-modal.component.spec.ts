import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTranslationModalComponent } from './add-translation-modal.component';

describe('AddTranslationModalComponent', () => {
  let component: AddTranslationModalComponent;
  let fixture: ComponentFixture<AddTranslationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTranslationModalComponent]
    });
    fixture = TestBed.createComponent(AddTranslationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
