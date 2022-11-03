import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CompanyDto } from './models/company-dto.interface';
import { MessageDto } from './models/message-dto.interface';

export const MY_COMPANY_ID = 'i';

@Injectable({ providedIn: 'root' })
export class ChatApiService {
    private _basePath = `${environment.baseUrl}/chat`;
    private _companies: Record<string, CompanyDto> = {};
    private _messages: Record<string, MessageDto[]> = {}
    private _newMessageIndex = 1;

    constructor(private _http: HttpClient) {
        'zxcvb'.split('').forEach(comapnyId => {
            this._companies[comapnyId] = {
                Id: comapnyId,
                name: `${comapnyId.toUpperCase()}. Author`,
                unreadQty: comapnyId === 'x'
                    ? 3
                    : comapnyId === 'b'
                        ? 4
                        : 0,
            };
            this._messages[comapnyId] = this._generateCompanyMessages(comapnyId);
        })
    }

    private _generateCompanyMessages(companyId: string): MessageDto[] {
        return 'qwert'.split('')
            .map((l, index) => ({
                Id: `${companyId}${l}`,
                text: `Message ${l.toUpperCase()} text of ${'er'.includes(l) ? MY_COMPANY_ID : 'company #' + companyId}`,
                authorId: 'er'.includes(l) ? MY_COMPANY_ID : companyId,
                author: `${'er'.includes(l) ? MY_COMPANY_ID : companyId.toUpperCase() + '. Author'}`,
                datetime: new Date(2022, 10, 17, 16, 20 + index * 2, 20),
                isMine: 'er'.includes(l),
                isCommon: false,
                isRead: companyId === 'x'
                    ? index < 2
                    : companyId === 'b'
                        ? index < 1
                        : true,
            }));

    }

    companies(): Observable<CompanyDto[]> {
        console.log('API: companies');
        return of(Object.values(this._companies));
        // return this._http.get<CompanyDto[]>(`${this._basePath}/companies`);
    }

    messages(companyId: string): Observable<MessageDto[]> {
        console.log('API: messages');
        return of(this._messages[companyId]).pipe(delay(1000));
        // return this._http.get<MessageDto[]>(`${this._basePath}/messages`);
    }

    sendMessage(text: string, companyId: string): Observable<void> {
        console.log('API: send message');
        const message: MessageDto = {
            Id: `${companyId}${this._newMessageIndex++}`,
            text,
            author: 'I',
            authorId: MY_COMPANY_ID,
            datetime: new Date(),
            isCommon: false,
            isRead: true,
        };
        this._messages[companyId].push(message);
        return of(null).pipe(delay(500));
    }

    markAllAsRead(companyId: string): Observable<void> {
        console.log('API: mark all as read');
        this._messages[companyId].forEach(m => {
            m.isRead = true;
        });
        this._companies[companyId].unreadQty = 0;
        return of(null).pipe(delay(500));
    }

    // FAKES
    __signalrCreateMessageFor(companyId: string) {
        const message: MessageDto = {
            Id: `${companyId}${this._newMessageIndex++}`,
            text: `SignalR emitted at ${new Date()} for ${companyId}`,
            author: `${companyId.toUpperCase()}. Author`,
            authorId: companyId,
            datetime: new Date(),
            isCommon: false,
            isRead: false,
        };
        this._companies[companyId].unreadQty++;
        this._messages[companyId].push(message);
    }
}
