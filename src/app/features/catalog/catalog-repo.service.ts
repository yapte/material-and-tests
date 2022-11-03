import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { defaultErrorHandler } from "./helpers/default-error-handler.function";
import { Catalog } from './catalog';
import { CatalogApiService } from './catalog-api.service';
import { CatalogDto } from './catalog-dto.interface';

@Injectable({providedIn: 'root'})
export class CatalogRepoService {

    constructor(private _catalogApi: CatalogApiService) { }

    list(): Observable<Catalog[]> {
        return this._catalogApi.list()
            .pipe(
                map(items => items.map(
                    (dto: CatalogDto) => {
                        try {
                            return new Catalog(dto);
                        } catch (err: any) {
                            throw new Error(err?.error?.message ?? err?.message ?? 'Ошибка преобразования модели CatalogDto => Catalog X(|');
                        }
                    }
                )),
                catchError((err) => throwError(() => defaultErrorHandler(err))),
            );
    }
}