const PI = Math.PI;

export class MathHelper {
    static getHypotenuseByCathets(cathet1: number, cathet2: number): number {
        if (cathet1 <= 0 || cathet2 <= 0) throw Error('Bad cathet length');
        return Math.sqrt(cathet1 * cathet1 + cathet2 * cathet2);
    }

    static getAngleOppositeCathet(angle: number, hypotenuse: number) {
        if (hypotenuse <= 0 || angle <= 0) throw Error('Bad data');
        if (Math.round(angle % PI * 1000) === 0) throw Error('Angle equals PI or 2PI');
        return Math.sin(angle) * hypotenuse;
    }
    static getAngleAdjacentCathet(angle: number, hypotenuse: number) {
        if (hypotenuse <= 0 || angle <= 0) throw Error('Bad data');
        if (Math.round(angle % PI * 1000) === 0) throw Error('Angle equals PI or 2PI');
        return Math.cos(angle) * hypotenuse;
    }
}