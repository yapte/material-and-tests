import { Injectable, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, filter, Observable, Subject, takeUntil } from "rxjs";
import { HandledError } from "../layer2-repo/handled-error";
import { TodosRepoService } from "../layer2-repo/links-repo.service";
import { FeaturePageModel } from "./feature-page-model.interface";

@Injectable()
export class FeatureFacadeService implements OnDestroy {
    private _destroy$ = new Subject<boolean>();
    private _page$ = new BehaviorSubject<FeaturePageModel>(null);
    private _inProgress$ = new BehaviorSubject<boolean>(false);
    private _error$ = new BehaviorSubject<HandledError>(null);

    page$: Observable<FeaturePageModel> = this._page$.pipe(
        takeUntil(this._destroy$),
        filter(p => !!p),
    );
    inProgress$: Observable<boolean> = this._inProgress$.asObservable();
    error$: Observable<HandledError> = this._error$.asObservable();

    constructor(private _todosRepo: TodosRepoService, private _snack: MatSnackBar) { }

    private _fetchData() {
        // IN PROGRESS => maybe local component, maybe common application state 
        this._inProgress$.next(true); // or _appState.showInProgress()
        this._todosRepo.todos()
            .subscribe({
                next: items => {
                    this._page$.next({ items })
                    this._inProgress$.next(false); // or _appState.hideInProgress()
                    this._error$.next(null);
                    this._snack.open('Successfully', 'XD', { duration: 5000 });
                },
                error: (err: HandledError) => {
                    this._inProgress$.next(false);
                    this._snack.open(err.message, 'X(', { duration: 5000 });
                    this._error$.next(err);

                    // TODO: maybe send messege to common application state, maybe local state
                    // for example: 
                    //      - _appState.showToastError('Произошла хуйня');
                    //      - _error.next('...');
                    //      - form.updateStateAndValidate()
                }
            });
    }

    init() {
        this._fetchData();
    }

    update() {
        this._fetchData();
    }

    ngOnDestroy() {
        this._destroy$.next(true);
        this._destroy$.complete();
    }
}