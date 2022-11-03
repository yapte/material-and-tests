import { Component, ElementRef, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ContextMenuComponent } from 'src/app/components/context-menu/context-menu.component';
import { CanvasDrawingService } from 'src/app/services/canvas-drawing.service';
import { DoorhandleDrawingService } from 'src/app/services/doorhandle-drawing.service';
import { RoofDrawingService } from 'src/app/services/roof-drawing.service';
import * as THREE from 'three';
import { Element3d } from './models/element3d';
import { Roof } from './models/roof';


@Component({
  selector: 'app-three-page',
  templateUrl: './three-page.component.html',
  styleUrls: ['./three-page.component.scss'],
  providers: [CanvasDrawingService, RoofDrawingService, DoorhandleDrawingService]
})
export class ThreePageComponent implements OnInit {
  renderer: THREE.Renderer;
  scene: THREE.Scene;

  constructor(
    private _el: ElementRef,
    private _bottomSheet: MatBottomSheet,
    private _canvasDrawing: CanvasDrawingService,
    private _roofDrawing: RoofDrawingService,
    private _doorhandleDrawing: DoorhandleDrawingService,
  ) { }

  ngOnInit(): void {
    [this.renderer, this.scene] = this._canvasDrawing.init();
    this._roofDrawing.init(this.scene);
    this._doorhandleDrawing.init(this.scene);
    (this._el.nativeElement as HTMLElement).append(this.renderer.domElement);

    document.querySelector('canvas').addEventListener('contextmenu', this.onRightClick.bind(this));

    const roof = new Roof();
    roof.height = 3;
    roof.width = 8;
    roof.length = 6;
    roof.rafterQty = 4;
    roof.distancesBetweenRafters = [0, 2, 2, 2];
    roof.crossbeamQty = 2;
    roof.distancesBetweenCrossbeams = [1, 1.5];
    roof.hasRidge = true;

    // this._roofDrawing.drawRoof2(roof);
    // this._roofDrawing.drawRoof1();
    this._doorhandleDrawing.drawDoorhandle();
    this._doorhandleDrawing.drawDoor();
  }

  onRightClick(event: MouseEvent) {
    const canvas = event.currentTarget as HTMLCanvasElement;
    const pointer = new THREE.Vector2();
    pointer.x = ((event.clientX - canvas.offsetLeft) / (canvas.width)) * 2 - 1;
    pointer.y = - ((event.clientY - canvas.offsetTop + window.scrollY) / (canvas.height)) * 2 + 1;

    const uuid: string = this._canvasDrawing.handleRightClick(pointer);
    const element3d: Element3d = this._roofDrawing.getElementByUuid(uuid);

    if (element3d) {
      const bottomSheetRef = this._bottomSheet.open(ContextMenuComponent);
      bottomSheetRef.instance.element3d = element3d;
    }
  }
}
