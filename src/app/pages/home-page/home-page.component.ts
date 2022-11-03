import { Dialog } from '@angular/cdk/dialog';
import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { opacityEnterAnimation } from 'src/animations/opacity-enter.animation';
import { CreateOrderDialogComponent } from '../create-order-dialog/create-order-dialog.component';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [opacityEnterAnimation],
})
export class HomePageComponent implements AfterViewInit {
  initialRect: ImageData;
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _dialog: Dialog,
  ) { }

  ngAfterViewInit(): void {
    this._activatedRoute.queryParams
      .subscribe(params => {
        const productId = +params['productId'];
        if (productId) {
          this.openDetailsById(productId);
        } else {
          this.hideDetails();
        }
      });
  }

  openDetailsById(id: number) {
    this._renderer.setStyle(document.body, 'overflow', 'hidden');
    const cardElem: HTMLDivElement = (this._element.nativeElement as HTMLElement).querySelector(`[id="${id}"]`);
    const imgElem = cardElem.querySelector('.card-img') as HTMLDivElement;
    const rect = imgElem.getClientRects()[0];
    setTimeout(() => {
      this.initialRect = {
        x: `${rect.x}px`,
        y: `${rect.y}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        path: imgElem.style.backgroundImage,
      };
    });
  }

  hideDetails() {
    if (this.initialRect)
      this.initialRect = null;

    this._renderer.setStyle(document.body, 'overflow', 'unset');
    this._router.navigate(['.'], { relativeTo: this._activatedRoute, queryParams: {} });
  }

  onAction(e: Event) {
    e.stopPropagation(); 

    const dialogRef = this._dialog.open(CreateOrderDialogComponent);
    dialogRef.closed.subscribe(x => console.log(x));
  }
}

export interface ImageData {
  x: string;
  y: string;
  width: string;
  height: string;
  path: string;
}
