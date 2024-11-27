import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtcAddComponent } from './atc-add.component';

describe('AtcAddComponent', () => {
  let component: AtcAddComponent;
  let fixture: ComponentFixture<AtcAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtcAddComponent]
    });
    fixture = TestBed.createComponent(AtcAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
