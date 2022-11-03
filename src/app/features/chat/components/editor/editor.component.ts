import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatFacadeService } from '../../chat-facade.service';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  @ViewChild('editor') editorRef: ElementRef<HTMLDivElement>;

  constructor(private _facade: ChatFacadeService) { }

  send() {
    const text = this.editorRef.nativeElement.innerText;
    this._facade.sendMessage(text);
    this.editorRef.nativeElement.innerText = '';
  }

}
