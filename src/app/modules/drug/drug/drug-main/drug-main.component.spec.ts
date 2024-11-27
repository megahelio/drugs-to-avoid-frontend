import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugMainComponent } from './drug-main.component';

describe('DrugMainComponent', () => {
  let component: DrugMainComponent;
  let fixture: ComponentFixture<DrugMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrugMainComponent]
    });
    fixture = TestBed.createComponent(DrugMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
