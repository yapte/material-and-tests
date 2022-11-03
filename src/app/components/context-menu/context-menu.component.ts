import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Element3d } from 'src/app/pages/three-page/models/element3d';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {
  @Input() element3d: Element3d;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ContextMenuComponent>) { }

  hide() {
    this._bottomSheetRef.dismiss();
  }
}
