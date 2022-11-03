import { Element3dType } from "./element3d-type.enum";

export interface Element3d {
    name: string; 
    type: Element3dType; 
    params: Record<string, number>; 
    mesh: THREE.Mesh;
}