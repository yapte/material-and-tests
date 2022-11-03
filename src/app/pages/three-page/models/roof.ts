export class Roof {
    height: number;
    width: number;
    length: number;
    rafterQty: number;
    /** Расстояния до предыдущего элемента */
    distancesBetweenRafters: number[];
    crossbeamQty: number;
    /** Расстояния до предыдущего элемента */
    distancesBetweenCrossbeams: number[];
    hasRidge: boolean = false;
    bottomCrossbeamSpace: number;
    topCrossbeamSpace: number;

    get halfWidth(): number {
        return this.width / 2;
    }

    get slope(): number {
        return Math.sqrt(this.height * this.height + this.halfWidth * this.halfWidth);
    }

    get angle(): number {
        return Math.acos(this.halfWidth / this.slope);
    }
}