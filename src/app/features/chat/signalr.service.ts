import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ChatApiService } from './chat-api.service';

@Injectable({ providedIn: 'root' })
export class SignalrService {
    private _messages$ = new BehaviorSubject<'z' | 'x' | 'c' | 'v' | 'b'>(null);

    messages$: Observable<'z' | 'x' | 'c' | 'v' | 'b'> = this._messages$.pipe(filter(m => !!m));

    constructor(
        // private _realSignalr: SignalR,
        private _api: ChatApiService,
    ) { }

    emitMessageForCompany(companyId: string) {
        this._api.__signalrCreateMessageFor(companyId);
        this._messages$.next(companyId as 'z' | 'x' | 'c' | 'v' | 'b');
    }
}