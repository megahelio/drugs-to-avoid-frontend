import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugCrudComponent } from './drug-crud.component';

describe('DrugCrudComponent', () => {
  let component: DrugCrudComponent;
  let fixture: ComponentFixture<DrugCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrugCrudComponent]
    });
    fixture = TestBed.createComponent(DrugCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
