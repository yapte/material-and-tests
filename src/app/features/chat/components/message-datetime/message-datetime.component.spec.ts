import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDatetimeComponent } from './message-datetime.component';

describe('MessageDatetimeComponent', () => {
  let component: MessageDatetimeComponent;
  let fixture: ComponentFixture<MessageDatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageDatetimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
