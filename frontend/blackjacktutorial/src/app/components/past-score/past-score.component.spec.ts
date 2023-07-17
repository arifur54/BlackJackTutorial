import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastScoreComponent } from './past-score.component';

describe('PastScoreComponent', () => {
  let component: PastScoreComponent;
  let fixture: ComponentFixture<PastScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PastScoreComponent]
    });
    fixture = TestBed.createComponent(PastScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
