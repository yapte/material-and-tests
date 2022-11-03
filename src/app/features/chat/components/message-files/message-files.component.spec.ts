import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFilesComponent } from './message-files.component';

describe('MessageFilesComponent', () => {
  let component: MessageFilesComponent;
  let fixture: ComponentFixture<MessageFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
