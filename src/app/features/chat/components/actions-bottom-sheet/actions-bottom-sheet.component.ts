import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ChatFacadeService } from '../../chat-facade.service';
import { ErrorType } from '../../helpers/error-type.enum';
import { SignalrService } from '../../signalr.service';

@Component({
  selector: 'app-actions-bottom-sheet',
  templateUrl: './actions-bottom-sheet.component.html',
  styleUrls: ['./actions-bottom-sheet.component.scss']
})
export class ActionsBottomSheetComponent implements OnInit {
  ErrorType = ErrorType;
  
  constructor(
    private _signalr: SignalrService,
    private _facade: ChatFacadeService,
    private _bottomSheetRef: MatBottomSheetRef,
  ) { }

  ngOnInit(): void {
  }

  sendMessage(comapnyId: string) {
    console.log('send message');
    this._signalr.emitMessageForCompany(comapnyId);
    this._bottomSheetRef.dismiss();
  }
  
  error(errorType: ErrorType) {
    this._facade.__emitError(errorType);
    this._bottomSheetRef.dismiss();
  }

}
