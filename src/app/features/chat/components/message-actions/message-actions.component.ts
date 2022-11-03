import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChatFacadeService } from '../../chat-facade.service';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';

@Component({
  selector: 'message-actions',
  templateUrl: './message-actions.component.html',
  styleUrls: ['./message-actions.component.scss']
})
export class MessageActionsComponent implements OnInit {
  private _modalRef: MatDialogRef<AcceptDialogComponent>
  constructor(
    private _facade: ChatFacadeService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  accept() {
    this._modalRef = this._dialog.open(AcceptDialogComponent, {
      width: '600px',
    });
    // this._modalRef.afterClosed().subscribe();
  }

}
