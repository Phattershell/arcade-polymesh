
//% block="Poly mesh" color="#279139" icon="\uf1b2" groups='["Create","Controls","Styling"]'
namespace Polymesh {

    export class FaceImg { public imgID: String[]; imgDB: Image[][];
    constructor() { this.reset(); }
    public reset() { this.imgID = []; this.imgDB = []; }
    public copy(from: FaceImg) { this.imgID = from.imgID.slice(); this.imgDB = from.imgDB.slice(); };
    public toHash(img: Image) { return hashImage(img); }
    }
    export class FlagMesh { public invisible: boolean; cull: boolean; lod: boolean; texStream: boolean;
    constructor() { this.invisible = false; this.cull = false; this.lod = false; this.texStream = false; } }

    export class Face { public indices: number[]; public color: number; public offset?: number; public scale?: number; public img?: Image;
    constructor(indices: number[], color: number, offset?: number, scale?: number, img?: Image) {
        this.indices = indices; this.color = color; this.offset = offset; this.scale = scale; this.img = img;
    } }
    export class FaceLOD { public indices: number[]; public color: number; public offset?: number; public scale?: number; public img?: Image; public imgs?: Image[];
    constructor(indices: number[], color: number, offset?: number, scale?: number, img?: Image, imgs?: Image[]) {
        this.indices = indices; this.color = color; this.offset = offset; this.scale = scale; this.img = img; this.imgs = imgs;
    } }

    export class Motion3 { public x: number; public y: number; public z: number; public vx: number; public vy: number; public vz: number; public ax: number; public ay: number; public az: number; public fx: number; public fy: number; public fz: number;
    constructor(x: number, y: number, z: number, vx: number, vy: number, vz: number, ax: number, ay: number, az: number, fx: number, fy: number, fz: number) {
        this.x = x; this.y = y; this.z = z; this.vx = vx; this.vy = vy; this.vz = vz; this.ax = ax; this.ay = ay; this.az = az; this.fx = fx; this.fy = fy; this.fz = fz;
    } }
    export class Vector3 { public x: number; public y: number; public z: number; constructor(x: number, y: number, z: number) { this.x = x; this.y = y; this.z = z; } }
    export interface Vector3_ { x: number, y: number, z: number, x_: number, y_: number, z_: number }

    const __meshes: polymesh[] = [];
    const __meshes_refs: {[id: number]: number[]} = {};
    const __meshes_null_refs: number[] = [];
    const __meshes_null_refh: {[id: number]: boolean} = {};
    const __meshes_kinds: {[kind: number]: polymesh[]} = {};
    export const PHI = 1.6180339887, NORMAL_DIST = 1.665, LOD_DIST = 1.2

    export const camview = new polyview(true);
    export let zoom = 1, sort = 0x0, dist = 150, fardist = 0;

    export function __meshes_upd_kind(msh: polymesh, kind: number) {
        if (msh.kind === (kind | 0)) return;
        __meshes_kinds[msh.kind] = __meshes_refs[msh.kind].map(i => __meshes[i]);
        __meshes_refs[msh.kind] = __meshes_refs[msh.kind].filter(idx => idx !== msh.idx);
        msh.kind = kind | 0;
        if (!__meshes_refs[msh.kind]) __meshes_refs[msh.kind] = [];
        if (!__meshes_kinds[kind]) __meshes_kinds[kind] = [];
        __meshes_refs[msh.kind].push(msh.idx);
        __meshes_kinds[msh.kind] = __meshes_refs[msh.kind].map(i => __meshes[i]);
    }

    export function __meshes_del(msh: polymesh) {
        __meshes_kinds[msh.kind] = __meshes_kinds[msh.kind].filter(m => m !== msh);
        __meshes_refs[msh.kind] = __meshes_refs[msh.kind].filter(idx => idx !== msh.idx);
        __meshes[msh.idx] = null;
        __meshes_null_refs.push(msh.idx);
        __meshes_null_refh[msh.idx] = true;
    }

    //% blockId=poly_sorttype
    //% block="set sorting method to $method"
    //% group="sorting"
    //% weight=10
    export function sortingMethod(method: PolySort) {
        if (sort !== method) sort = method;
    }

    //% blockId=poly_create
    //% block="create mesh with kind $kind=poly_kind_shadow"
    //% blockSetVariable=myMesh
    //% group="create"
    //% weight=10
    export function create(kind: number) {
        if (!__meshes_refs[kind]) __meshes_refs[kind] = []
        let idx = -1
        if (__meshes_null_refs.length > 0) {
            idx = __meshes_null_refs.pop()
            __meshes_null_refh[idx] = false
        }
        if (!__meshes_kinds[kind]) __meshes_kinds[kind] = [];
        if (idx < 0) {
            idx = __meshes.length
            __meshes_refs[kind].push(idx)
            const msh = new polymesh(Math.floor(kind), idx);
            __meshes.push(msh)
            __meshes_kinds[kind].push(msh)
            return msh
        }
        __meshes_refs[kind].push(idx)
        const msh = new polymesh(Math.floor(kind), idx);
        __meshes[idx] = msh
        __meshes_kinds[kind].push(msh)
        return msh
    }

    //% blockId=poly_kind_allmesh
    //% block="array mesh of kind $kind=poly_kind_shadow"
    //% blockSetVariable=myMeshes
    //% group="mesh kind"
    //% weight=13
    export function meshAll(kind: number) {
        return __meshes_kinds[kind]
    }

    export function meshAny() {
        return __meshes.filter((_, i) => !__meshes_null_refh[i])
    }

}

