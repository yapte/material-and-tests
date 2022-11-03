import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CatalogDto } from './catalog-dto.interface';

@Injectable({ providedIn: 'root' })
export class CatalogApiService {
    private _basePath = `${environment.baseUrl}/catalog`

    constructor(private _http: HttpClient) { }

    list(): Observable<CatalogDto[]> {
        return this._http.get<CatalogDto[]>(`${this._basePath}/list`);
    }
}