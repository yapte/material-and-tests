import { Element3d } from "../pages/three-page/models/element3d";
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export class DoorhandleDrawingService {

    private _scene: THREE.Scene;
    private _elements: Record<string, Element3d> = {};

    init(scene: THREE.Scene) {
        this._scene = scene;
    }

    drawDoorhandle(): THREE.Mesh {
        const baseSize = .1;
        const mainMesh = new THREE.Mesh();
        // const geometry = new THREE.TorusGeometry(2, .3, 100, 100);
        const geometry1 = new RoundedBoxGeometry(baseSize, baseSize, baseSize * 4, 5, baseSize / 10);
        const geometry2 = new RoundedBoxGeometry(baseSize, baseSize, baseSize * 2, 5, baseSize / 10);
        const material = new THREE.MeshNormalMaterial();
        const mesh1 = new THREE.Mesh(geometry1, material);
        const mesh2 = new THREE.Mesh(geometry2, material).rotateX(Math.PI / 2);
        mesh2.position.y = -.5 * baseSize;
        mesh2.position.z = -1.5 * baseSize;


        mainMesh.add(mesh1, mesh2);
        mainMesh.rotateX(Math.PI / 2);
        mainMesh.position.x = baseSize * 12;
        mainMesh.position.y = -baseSize;
        mainMesh.position.z = baseSize * 3;
        this._scene.add(mainMesh);

        return mainMesh;
    }

    drawDoor() {
        const baseSize = .3;
        const geometry = new THREE.BoxGeometry(baseSize * 11, baseSize * 20, baseSize);
        const material = new THREE.MeshNormalMaterial();
        const mesh = new THREE.Mesh(geometry, material);

        this._scene.add(mesh);

        return mesh;
    }

}