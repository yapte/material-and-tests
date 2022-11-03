import { Component, Host, HostBinding } from '@angular/core';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'message-text',
  templateUrl: './message-text.component.html',
  styleUrls: ['./message-text.component.scss']
})
export class MessageTextComponent {

  constructor(@Host() private _parent: MessageComponent) { }

  get text(): string {
    if ('jh'.includes(this._parent.message.id))
      return `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur facere, doloribus dolorem sunt quasi id
      voluptatem a? Doloremque a porro placeat, delectus amet beatae aut commodi sapiente, doloribus architecto
      maxime.`;
    return this._parent.message.text;
  }

  @HostBinding('class.is-common') get isCommon(): boolean {
    return this._parent.message.isCommon;
  }

}
