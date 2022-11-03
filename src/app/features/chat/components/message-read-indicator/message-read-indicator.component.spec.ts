import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageReadIndicatorComponent } from './message-read-indicator.component';

describe('MessageReadIndicatiorComponent', () => {
  let component: MessageReadIndicatorComponent;
  let fixture: ComponentFixture<MessageReadIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageReadIndicatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageReadIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
