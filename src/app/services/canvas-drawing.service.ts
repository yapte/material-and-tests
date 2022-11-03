import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const PI = Math.PI;
export class CanvasDrawingService {
    private camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
    private scene = new THREE.Scene();
    private controls: OrbitControls;
    private renderer = new THREE.WebGLRenderer({ antialias: true });
    private raycaster = new THREE.Raycaster();
    private intersected: any;

    private _configureThree() {
        this.camera.position.z = 5;
        this.scene.background = new THREE.Color(0xdedede);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.02;
        this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        this.renderer.setAnimationLoop(this._animate);
    }

    private _animate = () => {
        this.renderer.render(this.scene, this.camera);
    }

    init(): [THREE.Renderer, THREE.Scene] {
        this._configureThree();
        this.scene.add(new THREE.GridHelper(10))
        return [this.renderer, this.scene];
    }

    handleRightClick(pointer: THREE.Vector2): string {
        this.raycaster.setFromCamera(pointer, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, false);

        if (this.intersected)
            this.intersected.material?.emissive?.setHex(this.intersected.currentHex);
        this.intersected = null;

        if (intersects.length > 0 && this.intersected != intersects[0].object) {
            this.intersected = intersects[0].object;
            this.colorizeAsSelected(this.intersected);
        }

        return this.intersected?.uuid;
    }

    colorizeAsSelected(element: any) {
        element.currentHex = this.intersected.material.emissive?.getHex() ?? 0xffffff;
        if (element.material.emissive)
            element.material.emissive.setHex(0xff8888);
    }
}