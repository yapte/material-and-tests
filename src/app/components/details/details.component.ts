import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ImageData } from 'src/app/pages/home-page/home-page.component';
import { BehaviorSubject } from 'rxjs';
import { titleAnimation } from 'src/animations/title.animation';
import { opacityEnterAnimation } from 'src/animations/opacity-enter.animation';
import { modalLeaveAnimation } from 'src/animations/modal-leave.animation';

const TIMEOUT1 = 100;
const TIMEOUT2 = 500;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [titleAnimation],
})
export class DetailsComponent implements OnInit {
  private _initialRect: ImageData;
  @Input() set initialRect(value: ImageData) {
    this._initialRect = { ...value };
    this.rect = { ...value };
  }
  rect: ImageData;

  @Output() onClose = new EventEmitter<void>();

  timelineState: TimelineState = { index: 0, class: 'state0' };

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.rect = {
        ...this.rect,
        x: '40px',
        y: '40px',
        width: 'calc(100vw - 80px)',
        height: 'calc(100vw / 2 - 80px / 2)',
      };
      this.timelineState = { index: 1, class: 'state1' };
    }, TIMEOUT1);

    setTimeout(() => {
      this.timelineState = { index: 2, class: 'state2' };
    }, TIMEOUT1 + TIMEOUT2);
  }

  close() {
    this.timelineState = { index: 1, class: 'state1' };

    setTimeout(() => {
      this.rect = { ...this._initialRect };
    }, TIMEOUT1);

    setTimeout(() => {
      this.timelineState = { index: 0, class: 'state0' };
      this.onClose.emit();
    }, TIMEOUT1 + TIMEOUT2);
  }
}

export interface TimelineState {
  index: number;
  class: string;
}