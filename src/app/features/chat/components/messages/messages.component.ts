import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatFacadeService } from '../../chat-facade.service';
import { Observable } from 'rxjs';
import { first, filter, map, tap } from 'rxjs/operators';
import { Message } from '../../models/message';
import { MessagesView } from '../../models/messages-view.interface';
import { MessagesFetchTrigger } from '../../models/messages-fetch-trigger.enum';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messagesView$: Observable<MessagesView> = this._facade.messagesView$
    .pipe(
      tap(view => {
        if (!view) return;

        if (view.fetchTrigger === MessagesFetchTrigger.WithScrollToUnread) {
          this._scrollToFirstUnreadMessage(view.messages);
        }

        if (!!view.messages.find(m => !m.isRead)) {
          this._facade.markAllAsRead();
        }
      })
    );

  constructor(
    private _facade: ChatFacadeService,
    private _host: ElementRef<HTMLElement>,
  ) { }

  private _scrollToFirstUnreadMessage(messages: Message[] = []) {
    setTimeout(() => {
      const firstUnread = messages?.find(m => !m.isRead);
      let top = this._host.nativeElement.scrollHeight;
      if (!firstUnread) {
        this._host.nativeElement.scrollBy({ behavior: 'smooth', top });
        return;
      }

      let messageElemRef: HTMLElement = this._host.nativeElement.querySelector(`[data-id=${firstUnread.id}]`) as HTMLElement;
      if (!messageElemRef) {
        this._host.nativeElement.scrollBy({ behavior: 'smooth', top });
        return;
      }

      top = messageElemRef
        ? messageElemRef.offsetTop - this._host.nativeElement.offsetTop - 40
        : this._host.nativeElement.scrollHeight;
      this._host.nativeElement.scrollBy({ behavior: 'smooth', top });
    });
  }

  ngOnInit(): void {
    // this.messagesView$.pipe(
    //   filter(p => !!p),
    //   first(),
    //   tap(view => {
    //     this._scrollToFirstUnreadMessage(view.messages);
    //     if (!!view.messages.find(m => !m.isRead)) {
    //       this._facade.markAllAsRead();
    //     }
    //   }),
    // ).subscribe({ complete: () => console.log('COMPLETE') });

    // this._facade.scrollTounreadMessageEmitter$
    //   .subscribe(() => this._scrollToFirstUnreadMessage());
  }


}
