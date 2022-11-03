import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { defaultErrorHandler } from "./helpers/default-error-handler.function";
import { Message } from './models/message';
import { ChatApiService } from './chat-api.service';
import { MessageDto } from './models/message-dto.interface';
import { Company } from './models/company';
import { CompanyDto } from './models/company-dto.interface';

@Injectable({ providedIn: 'root' })
export class ChatRepoService {

    constructor(private _chatApi: ChatApiService) { }

    companies(): Observable<Company[]> {
        return this._chatApi.companies()
            .pipe(
                map(items => items.map(
                    (dto: CompanyDto) => {
                        try {
                            return new Company(dto);
                        } catch (err: any) {
                            throw new Error(err?.error?.message ?? err?.message ?? 'Ошибка преобразования модели ChatDto => Chat X(|');
                        }
                    }
                )),
                catchError((err) => throwError(() => defaultErrorHandler(err))),
            );
    }

    messages(companyId: string): Observable<Message[]> {
        console.log('REPO: messages');
        return this._chatApi.messages(companyId)
            .pipe(
                map(items => items.map(
                    (dto: MessageDto) => {
                        try {
                            return new Message(dto);
                        } catch (err: any) {
                            throw new Error(err?.error?.message ?? err?.message ?? 'Ошибка преобразования модели ChatDto => Chat X(|');
                        }
                    }
                )),
                catchError((err) => throwError(() => defaultErrorHandler(err))),
            );
    }

    markAllAsRead(companyId: string): Observable<void> {
        return this._chatApi.markAllAsRead(companyId);
    }

    sendMessage(text: string, companyId: string): Observable<void> {
        return this._chatApi.sendMessage(text, companyId);
    }

    
}