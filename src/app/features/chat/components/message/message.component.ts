import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { titleAnimation } from 'src/animations/title.animation';
import { MY_COMPANY_ID } from '../../chat-api.service';
import { Message } from '../../models/message';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [titleAnimation]
})
export class MessageComponent {
  @Input() message: Message;

  constructor() { }

  @HostBinding('class.is-mine') get isMine(): boolean {
    return this.message.authorId === MY_COMPANY_ID;
  }

  @HostBinding('class.is-common') get isCommon(): boolean {
    return this.message.isCommon;
  }

  @HostBinding('class.is-unread') get isUnread(): boolean {
    return !this.message.isRead;
  }
}
