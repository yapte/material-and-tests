import { formatDate } from '@angular/common';
import { Component, Host } from '@angular/core';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'message-datetime',
  templateUrl: './message-datetime.component.html',
  styleUrls: ['./message-datetime.component.scss']
})
export class MessageDatetimeComponent {
  constructor(@Host() private _parent: MessageComponent) { }

  get datetime(): string {
    return formatDate(this._parent.message.datetime, 'HH:mm dd MMM', 'ru-RU');
  }
}
