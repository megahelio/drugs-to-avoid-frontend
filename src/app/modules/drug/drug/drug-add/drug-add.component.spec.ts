import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugAddComponent } from './drug-add.component';

describe('DrugAddComponent', () => {
  let component: DrugAddComponent;
  let fixture: ComponentFixture<DrugAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrugAddComponent]
    });
    fixture = TestBed.createComponent(DrugAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
