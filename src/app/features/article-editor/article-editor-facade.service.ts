import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HandledError } from 'src/app/modules/feature/layer2-repo/handled-error';

import { ArticleEditorPage } from './article-editor-page.interface';
import { ArticleEditorRepoService } from './article-editor-repo.service';

@Injectable()
export class ArticleEditorFacadeService implements OnDestroy {
    private _destroy$ = new Subject<boolean>();
    private _page$ = new BehaviorSubject<ArticleEditorPage>(null);
    private _inProgress$ = new BehaviorSubject<boolean>(false);
    private _error$ = new BehaviorSubject<HandledError>(null);

    page$: Observable<ArticleEditorPage> = this._page$.pipe(
        takeUntil(this._destroy$),
        filter(p => !!p),
    );
    inProgress$: Observable<boolean> = this._inProgress$.asObservable();
    error$: Observable<HandledError> = this._error$.asObservable();

    constructor(private _articleEditorRepo: ArticleEditorRepoService) {}

    private _fetchData() {
        // TODO: 
        this._articleEditorRepo.list().subscribe({
            error: err => {
                this._error$.next(err);
            }
        });
        this._page$.next({/* Page */});
    }

    init() {
        this._fetchData();
    }

    ngOnDestroy() {
        this._destroy$.next(true);
        this._destroy$.complete();
    }
}