import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAuthorComponent } from './message-author.component';

describe('MessageAuthorComponent', () => {
  let component: MessageAuthorComponent;
  let fixture: ComponentFixture<MessageAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageAuthorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
