import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActionsBottomSheetComponent } from 'src/app/features/chat/components/actions-bottom-sheet/actions-bottom-sheet.component';
import { SignalrService } from 'src/app/features/chat/signalr.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  constructor(
    private _signalr: SignalrService,
    private _bottomSheet: MatBottomSheet,
  ) { }

  showActions() {
    this._bottomSheet.open(ActionsBottomSheetComponent);
  }

}
