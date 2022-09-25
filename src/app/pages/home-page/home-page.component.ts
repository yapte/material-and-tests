import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { opacityEnterAnimation } from 'src/animations/opacity-enter.animation';


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
export class HomePageComponent implements OnInit {
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
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams
      .subscribe(params => {
        
      });
  }

  openDetails(e: Event) {
    const cardElem: HTMLDivElement = e.currentTarget as HTMLDivElement;
    const imgElem = cardElem.querySelector('.card-img') as HTMLDivElement;
    const rect = imgElem.getClientRects()[0];
    this.initialRect = {
      x: `${rect.x}px`,
      y: `${rect.y}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      path: imgElem.style.backgroundImage,
    };

    this._router.navigate(['.'], { relativeTo: this._activatedRoute, queryParams: { productId: 12 } });
  }

  hideDetails() {
    this.initialRect = null;
    this._router.navigate(['.'], { relativeTo: this._activatedRoute, queryParams: {} });
  }

  onAction(e: Event) {
    e.stopPropagation();
    alert((e.target as HTMLButtonElement).innerText);
  }
}

export interface ImageData {
  x: string;
  y: string;
  width: string;
  height: string;
  path: string;
}
