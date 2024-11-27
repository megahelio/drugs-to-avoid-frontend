import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugElementComponent } from './drug-element.component';

describe('DrugElementComponent', () => {
  let component: DrugElementComponent;
  let fixture: ComponentFixture<DrugElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrugElementComponent]
    });
    fixture = TestBed.createComponent(DrugElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
