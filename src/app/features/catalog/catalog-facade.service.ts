import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { CatalogPage } from './catalog-page.interface';
import { CatalogRepoService } from './catalog-repo.service';
import { HandledError } from './helpers/handled-error';

@Injectable()
export class CatalogFacadeService implements OnDestroy {
    private _destroy$ = new Subject<boolean>();
    private _page$ = new BehaviorSubject<CatalogPage>(null);
    private _inProgress$ = new BehaviorSubject<boolean>(false);
    private _error$ = new BehaviorSubject<HandledError>(null);

    page$: Observable<CatalogPage> = this._page$.pipe(
        takeUntil(this._destroy$),
        filter(p => !!p),
    );
    inProgress$: Observable<boolean> = this._inProgress$.asObservable();
    error$: Observable<HandledError> = this._error$.asObservable();

    constructor(private _catalogRepo: CatalogRepoService) {}

    private _fetchData() {
        // TODO: 
        this._catalogRepo.list().subscribe();
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