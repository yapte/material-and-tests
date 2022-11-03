import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { ChatFacadeService } from '../../chat-facade.service';
import { ErrorType } from '../../helpers/error-type.enum';
import { HandledError } from '../../helpers/handled-error';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
    isShown$: Observable<boolean> = this._facade.messagesView$
        .pipe(map(ms => !!ms));
    inProgress$: Observable<boolean> = this._facade.inProgress$;
    error$: Observable<HandledError> = this._facade.error$;

    @ViewChild('error500') error500ref: TemplateRef<any>;

    constructor(
        private _facade: ChatFacadeService,
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
        this._facade.init();
        this.error$.pipe(
            filter(e => !!e),
            tap(e => {
                if (e.errorType === ErrorType.Failure) {
                    this._dialog.open(this.error500ref);
                    return;
                }

                if (e.errorType === ErrorType.BadRequest) {
                    this._snackBar.open(JSON.stringify(e.errorMap), '', { duration: 2000 });
                }
            })
        )
            .subscribe();
    }


}