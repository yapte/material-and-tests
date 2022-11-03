import { formatDate } from '@angular/common';
import { Component, Host } from '@angular/core';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'message-author',
  templateUrl: './message-author.component.html',
  styleUrls: ['./message-author.component.scss']
})
export class MessageAuthorComponent {

  constructor(@Host() private _parent: MessageComponent) { }

  get author(): string {
    return this._parent.isMine ? '' : this._parent.message.author;
  }

  get datetime(): string {
    return formatDate(this._parent.message.datetime, 'HH:mm dd MMM', 'ru-RU');
  }
}
