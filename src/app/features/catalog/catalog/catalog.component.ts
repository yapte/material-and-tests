import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CatalogPage } from '../catalog-page.interface';
import { CatalogFacadeService } from '../catalog-facade.service';
import { HandledError } from '../helpers/handled-error';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
    providers: [CatalogFacadeService],
})
export class CatalogComponent {
    page$: Observable<CatalogPage> = this._facade.page$;
    inProgress$: Observable<boolean> = this._facade.inProgress$;
    error$: Observable<HandledError> = this._facade.error$;

    constructor(private _facade: CatalogFacadeService) { }
    
    ngOnInit(): void {
        this._facade.init();
    }
}