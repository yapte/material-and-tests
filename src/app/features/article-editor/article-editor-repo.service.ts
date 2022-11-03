import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Article } from './article';
import { ArticleEditorApiService } from './article-editor-api.service';
import { ArticleDto } from './article-dto.interface';
import { defaultErrorHandler } from 'src/app/modules/feature/layer2-repo/default-error-handler.function';

@Injectable({providedIn: 'root'})
export class ArticleEditorRepoService {

    constructor(private _articleEditorApi: ArticleEditorApiService) { }

    list(): Observable<Article[]> {
        return this._articleEditorApi.list()
            .pipe(
                map(items => items.map(
                    (dto: ArticleDto) => {
                        try {
                            return new Article(dto);
                        } catch (err: any) {
                            throw new Error(err?.error?.message ?? err?.message ?? 'Ошибка преобразования модели ArticleEditorDto => ArticleEditor X(|');
                        }
                    }
                )),
                catchError((err) => throwError(() => defaultErrorHandler(err))),
            );
    }
}