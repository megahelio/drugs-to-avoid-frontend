import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtcCrudComponent } from './atc-crud.component';

describe('AtcCrudComponent', () => {
  let component: AtcCrudComponent;
  let fixture: ComponentFixture<AtcCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtcCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtcCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
