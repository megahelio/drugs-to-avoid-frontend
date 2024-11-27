import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSanitaryalertModalComponent } from './add-sanitaryalert-modal.component';

describe('AddSanitaryalertModalComponent', () => {
  let component: AddSanitaryalertModalComponent;
  let fixture: ComponentFixture<AddSanitaryalertModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSanitaryalertModalComponent]
    });
    fixture = TestBed.createComponent(AddSanitaryalertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
