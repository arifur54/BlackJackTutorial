import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBlackjackComponent } from './play-blackjack.component';

describe('PlayBlackjackComponent', () => {
  let component: PlayBlackjackComponent;
  let fixture: ComponentFixture<PlayBlackjackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayBlackjackComponent]
    });
    fixture = TestBed.createComponent(PlayBlackjackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
