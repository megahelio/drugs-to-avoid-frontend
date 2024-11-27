import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtcEditComponent } from './atc-edit.component';

describe('AtcEditComponent', () => {
  let component: AtcEditComponent;
  let fixture: ComponentFixture<AtcEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtcEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtcEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
