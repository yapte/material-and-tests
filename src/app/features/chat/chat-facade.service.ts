import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';

import { ChatRepoService } from './chat-repo.service';
import { ErrorType } from './helpers/error-type.enum';
import { HandledError } from './helpers/handled-error';
import { Company } from './models/company';
import { Message } from './models/message';
import { MessagesFetchTrigger } from './models/messages-fetch-trigger.enum';
import { MessagesView } from './models/messages-view.interface';
import { SignalrService } from './signalr.service';

@Injectable()
export class ChatFacadeService implements OnDestroy {
    private _destroy$ = new Subject<boolean>();
    private _companies$ = new BehaviorSubject<Company[]>(null);
    private _messagesView$ = new BehaviorSubject<MessagesView>(null);
    private _inProgress$ = new BehaviorSubject<boolean>(true);
    private _error$ = new BehaviorSubject<HandledError>(null);
    private _fetchEmitter$ = new BehaviorSubject<{ companyId: string, fetchTrigger: MessagesFetchTrigger }>(null);

    companies$: Observable<Company[]> = this._companies$.pipe(takeUntil(this._destroy$));
    messagesView$: Observable<MessagesView> = this._messagesView$.pipe(takeUntil(this._destroy$));
    inProgress$: Observable<boolean> = this._inProgress$.asObservable();
    error$: Observable<HandledError> = this._error$.asObservable();

    constructor(
        private _chatRepo: ChatRepoService,
        private _signalr: SignalrService,
    ) { }

    private _fetchCompanies() {
        this._chatRepo.companies()
            .subscribe({
                next: companies => {
                    this._companies$.next(companies);
                    this._inProgress$.next(false);
                    this._error$.next(null);
                },
                error: err => {
                    this._inProgress$.next(false);
                    this._error$.next(err);
                },
            });
    }

    init() {
        this._fetchCompanies();

        this._fetchEmitter$.pipe(
            takeUntil(this._destroy$),
            filter(id => !!id),
            switchMap(e => combineLatest([
                this._chatRepo.messages(e.companyId),
                of(e.fetchTrigger),
            ])),
            tap({
                next: ([messages, fetchTrigger]) => {
                    this._messagesView$.next({ messages, fetchTrigger });
                    this._inProgress$.next(false);
                    this._error$.next(null);
                },
                error: err => {
                    this._inProgress$.next(false);
                    this._error$.next(err);
                },
            }),
        ).subscribe();

        this._signalr.messages$.pipe(
            takeUntil(this._destroy$),
            tap(id => {
                this._fetchCompanies();
                if (id === this._fetchEmitter$.value?.companyId) {
                    this._fetchEmitter$.next({ companyId: id, fetchTrigger: MessagesFetchTrigger.WithScrollToUnread });
                }
            }),
        ).subscribe();
    }

    fetchMessagesForCompany(companyId: string) {
        this._messagesView$.next(null);
        this._fetchEmitter$.next({ companyId, fetchTrigger: MessagesFetchTrigger.WithScrollToUnread });
        this._inProgress$.next(true);
    }

    markAllAsRead(): void {
        this._chatRepo.markAllAsRead(this._fetchEmitter$.value.companyId)
            .subscribe({
                next: () => {
                    console.log('FACADE: markAllAsRead');
                    this._fetchCompanies();
                    this._fetchEmitter$.next({ ...this._fetchEmitter$.value, fetchTrigger: MessagesFetchTrigger.Usual });
                },
                error: err => {
                    this._inProgress$.next(false);
                    this._error$.next(err);
                },
            });
    }

    sendMessage(text: string) {
        this._chatRepo.sendMessage(text, this._fetchEmitter$.value.companyId)
            .subscribe({
                next: () => {
                    this._fetchEmitter$.next({ ...this._fetchEmitter$.value, fetchTrigger: MessagesFetchTrigger.WithScrollToUnread });
                },
                error: err => {
                    this._inProgress$.next(false);
                    this._error$.next(err);
                },
            })
    }

    ngOnDestroy() {
        this._destroy$.next(true);
        this._destroy$.complete();
    }

    __emitError(errorType: ErrorType) {
        const error = new HandledError('handled error', errorType, {});
        if (errorType === ErrorType.BadRequest) {
            error.errorMap['field1'] = 'Bad field1';
            error.errorMap['messageX'] = 'Message about error';
        }
        this._error$.next(error);
    }
}