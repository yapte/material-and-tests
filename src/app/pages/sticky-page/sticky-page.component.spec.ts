import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyPageComponent } from './sticky-page.component';

describe('StickyPageComponent', () => {
  let component: StickyPageComponent;
  let fixture: ComponentFixture<StickyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
