import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsBottomSheetComponent } from './actions-bottom-sheet.component';

describe('ActionsBottomSheetComponent', () => {
  let component: ActionsBottomSheetComponent;
  let fixture: ComponentFixture<ActionsBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
