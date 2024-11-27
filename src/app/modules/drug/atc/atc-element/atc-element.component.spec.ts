import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtcElementComponent } from './atc-element.component';

describe('AtcElementComponent', () => {
  let component: AtcElementComponent;
  let fixture: ComponentFixture<AtcElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtcElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtcElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
