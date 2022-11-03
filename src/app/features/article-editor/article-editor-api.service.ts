import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleDto } from './article-dto.interface';

@Injectable({ providedIn: 'root' })
export class ArticleEditorApiService {
    private _basePath = `${environment.baseUrl}/article-editor`

    constructor(private _http: HttpClient) { }

    list(): Observable<ArticleDto[]> {
        return this._http.get<ArticleDto[]>(`${this._basePath}/list`);
    }
}