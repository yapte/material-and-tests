import { Balk } from "../pages/three-page/models/balk";
import { Element3d } from "../pages/three-page/models/element3d";
import { Glass } from "../pages/three-page/models/glass";
import * as THREE from 'three';
import { Element3dType } from "../pages/three-page/models/element3d-type.enum";
import { Roof } from "../pages/three-page/models/roof";
import { MathHelper } from "../pages/three-page/math-helper";

const PI = Math.PI;

export class RoofDrawingService {
    private _scene: THREE.Scene;
    private _elements: Record<string, Element3d> = {};

    init(scene: THREE.Scene) {
        this._scene = scene;
    }

    drawRoof2(roof: Roof) {
        for (let i = 1; i <= roof.distancesBetweenRafters.length; i++) {
            const positionY: number = roof.height / 2
            const positionZ: number = -roof.distancesBetweenRafters.slice(0, i).reduce((acc, el) => acc + el, 0);
            this.createBalk({ length: roof.slope, thickness: .1, rotateZ: roof.angle, positionX: -roof.halfWidth / 2, positionY, positionZ });
            this.createBalk({ length: roof.slope, thickness: .1, rotateZ: -roof.angle, positionX: roof.halfWidth / 2, positionY, positionZ });
        }

        for (let i = 1; i <= roof.distancesBetweenCrossbeams.length; i++) {
            const hyp: number = roof.distancesBetweenCrossbeams.slice(0, i).reduce((acc, el) => acc + el, 0);
            const positionY: number = MathHelper.getAngleOppositeCathet(roof.angle, hyp);
            const positionX: number = -roof.halfWidth + MathHelper.getAngleAdjacentCathet(roof.angle, hyp);
            const positionZ: number = -roof.length / 2;
            this.createBalk({ length: roof.length, thickness: .1, rotateY: PI / 2, positionX, positionY, positionZ });
            this.createBalk({ length: roof.length, thickness: .1, rotateY: PI / 2, positionX: -positionX, positionY, positionZ });
        }

        const crossbeams: number[] = [...roof.distancesBetweenCrossbeams, roof.slope - roof.distancesBetweenCrossbeams.reduce((acc, el) => acc + el, 0)];
        for (let i = 1; i <= roof.distancesBetweenRafters.length; i++) {
            for (let j = 1; j <= crossbeams.length; j++) {
                const hyp: number = crossbeams.slice(0, j).reduce((acc, el) => acc + el, 0);
                const positionX: number = roof.halfWidth - MathHelper.getAngleAdjacentCathet(roof.angle, hyp) + MathHelper.getAngleAdjacentCathet(roof.angle, crossbeams[j - 1] / 2);
                const positionY: number = MathHelper.getAngleOppositeCathet(roof.angle, hyp) - MathHelper.getAngleOppositeCathet(roof.angle, crossbeams[j - 1]) / 2;
                const positionZ: number = -roof.distancesBetweenRafters[i] / 2 - roof.distancesBetweenRafters.slice(0, i).reduce((acc, el) => acc + el, 0);
                this.createGlass({ length: crossbeams[j - 1], width: roof.distancesBetweenRafters[i], rotateZ: -roof.angle, positionX, positionY, positionZ });
                this.createGlass({ length: crossbeams[j - 1], width: roof.distancesBetweenRafters[i], rotateZ: roof.angle, positionX: -positionX, positionY, positionZ });
            }
        }
    }

    drawRoof1() {
        this.createBalk({ length: 6, thickness: .1, rotateZ: PI / 4, positionX: -Math.sqrt(18) / 2 });
        this.createBalk({ length: 6, thickness: .1, rotateZ: -PI / 4, positionX: Math.sqrt(18) / 2 });
        this.createBalk({ length: 6, thickness: .1, rotateZ: PI / 4, positionX: -Math.sqrt(18) / 2, positionZ: -2 });
        this.createBalk({ length: 6, thickness: .1, rotateZ: -PI / 4, positionX: Math.sqrt(18) / 2, positionZ: -2 });
        this.createBalk({ length: 6, thickness: .1, rotateZ: PI / 4, positionX: -Math.sqrt(18) / 2, positionZ: -4 });
        this.createBalk({ length: 6, thickness: .1, rotateZ: -PI / 4, positionX: Math.sqrt(18) / 2, positionZ: -4 });

        const height = Math.sqrt(18);
        this.createBalk({ length: 4, thickness: .1, rotateY: PI / 2, positionX: height / 3, positionY: height / 6, positionZ: -2 });
        this.createBalk({ length: 4, thickness: .1, rotateY: PI / 2, positionX: height * 2 / 3, positionY: -height / 6, positionZ: -2 });
        this.createBalk({ length: 4, thickness: .1, rotateY: PI / 2, positionX: -height / 3, positionY: height / 6, positionZ: -2 });
        this.createBalk({ length: 4, thickness: .1, rotateY: PI / 2, positionX: -height * 2 / 3, positionY: -height / 6, positionZ: -2 });

        this.createGlass({ length: 6, width: 2, rotateZ: -PI / 4, positionX: Math.sqrt(18) / 2, positionZ: -1 });
        this.createGlass({ length: 6, width: 2, rotateZ: PI / 4, positionX: -Math.sqrt(18) / 2, positionZ: -1 });
        this.createGlass({ length: 6, width: 2, rotateZ: -PI / 4, positionX: Math.sqrt(18) / 2, positionZ: -3 });
        this.createGlass({ length: 6, width: 2, rotateZ: PI / 4, positionX: -Math.sqrt(18) / 2, positionZ: -3 });
    }

    createBalk(params: Balk): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(params.length, params.thickness, params.thickness);
        const material = new THREE.MeshLambertMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotateZ(params.rotateZ ?? 0);
        mesh.rotateY(params.rotateY ?? 0);
        mesh.position.setX(params.positionX ?? 0);
        mesh.position.setY(params.positionY ?? 0);
        mesh.position.setZ(params.positionZ ?? 0);

        this._elements[mesh.uuid] = {
            name: 'Balk',
            type: Element3dType.Balk,
            params: params as Record<string, any>,
            mesh,
        };

        this._scene.add(mesh);

        return mesh;
    }

    createGlass(params: Glass) {
        const geometry = new THREE.BoxGeometry(params.length, .02, params.width);
        const material = new THREE.MeshLambertMaterial({ opacity: 0.24, transparent: true, color: 0xff00f0 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotateZ(params.rotateZ ?? 0);
        mesh.position.setX(params.positionX ?? 0);
        mesh.position.setY(params.positionY ?? 0);
        mesh.position.setZ(params.positionZ ?? 0);

        this._elements[mesh.uuid] = {
            name: 'Glass',
            type: Element3dType.Glass,
            params: params as Record<string, any>,
            mesh,
        };

        this._scene.add(mesh);
    }

    getElementByUuid(uuid: string): Element3d {
        return this._elements[uuid];
    }
}