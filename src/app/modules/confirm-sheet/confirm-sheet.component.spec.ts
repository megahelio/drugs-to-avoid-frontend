import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSheetComponent } from './confirm-sheet.component';

describe('ConfirmSheetComponent', () => {
  let component: ConfirmSheetComponent;
  let fixture: ComponentFixture<ConfirmSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmSheetComponent]
    });
    fixture = TestBed.createComponent(ConfirmSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
