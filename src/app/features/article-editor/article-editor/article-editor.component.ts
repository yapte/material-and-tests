import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ArticleEditorPage } from '../article-editor-page.interface';
import { ArticleEditorFacadeService } from '../article-editor-facade.service';
import { HandledError } from 'src/app/modules/feature/layer2-repo/handled-error';

@Component({
    selector: 'app-article-editor',
    templateUrl: './article-editor.component.html',
    styleUrls: ['./article-editor.component.scss'],
    providers: [ArticleEditorFacadeService],
})
export class ArticleEditorComponent implements OnInit {
    private _selection: Selection = null;
    private _isSelectionStarted = false;
    page$: Observable<ArticleEditorPage> = this._facade.page$;
    inProgress$: Observable<boolean> = this._facade.inProgress$;
    error$: Observable<HandledError> = this._facade.error$;

    isLinkActive = false;

    // @ViewChild('editor', { static: true }) editorRef: ElementRef<HTMLDivElement>


    constructor(private _facade: ArticleEditorFacadeService) { }

    @HostListener('mouseup') onMouseup() {
        if (this._isSelectionStarted) {
            this._isSelectionStarted = false;
            this._selection = window.getSelection();

            console.log(this._selection);            
        }
    }
    ngOnInit(): void {
        this._facade.init();
        // this.editorRef.nativeElement.onselectstart = (e) => {
        //     console.log('onselectstart', e);

        //     document.onmouseup = () => {
        //         console.log(window.getSelection())
        //         alert(window.getSelection());
        //     }
        // }
    }

    onSelectstart(e: Event) {
        this._isSelectionStarted = true;
        // console.log(e);
        // const range = document.createRange();
        // range.selectNodeContents(e.target as HTMLDivElement);
        // console.log(range);
        // const sel = window.getSelection();
        // sel.removeAllRanges();
        // sel.addRange(range);
        // console.log(sel);
    }
}