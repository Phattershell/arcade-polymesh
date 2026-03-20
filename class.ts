namespace Polymesh {

    export class base {
        protected __prop_upd: control.FrameCallback; __del: boolean; protected __unDel: boolean; protected __updateLoop: boolean;
        public pos: Motion3; public rot: Motion3;
    
        public init() { }
    
        public __onLoop() { }
    
        loop() {
            this.__prop_upd = control.eventContext().registerFrameHandler(scene.PRE_RENDER_UPDATE_PRIORITY, () => {
                control.runInParallel(() => {
                    const delta = Fx8(control.eventContext().deltaTime)
                    this.rot.update(delta), this.pos.update(delta);
                    this.__onLoop();
                })
            });
        }
    
        constructor(undel?: boolean, noUpdate?: boolean) {
            this.__unDel = undel;
            this.__del = false;
            this.rot = new Polymesh.Motion3( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );
            this.pos = new Polymesh.Motion3( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );
            this.init();
            this.__updateLoop = !noUpdate;
            if (this.__updateLoop) this.loop();
        }

        setUpdate(ok: boolean) {
            if (ok === this.__updateLoop) return;
            if (ok) this.loop();
            else control.eventContext().unregisterFrameHandler(this.__prop_upd);
            this.__updateLoop = ok;
        }
    
        isDel() {
            return this.__del
        }
    
        public __onDel() { }
    
        del() {
            if (this.__unDel) return;
            this.__del = true; control.eventContext().unregisterFrameHandler(this.__prop_upd);
            this.rot = null, this.pos = null;
            this.__onDel();
        }

        setAngle(choice: number, x: number) {
            if (this.isDel()) return
            switch (choice) {
                case 0x0: if (this.rot.x  !== x) this.rot.x  = x; break
                case 0x1: if (this.rot.y  !== x) this.rot.y  = x; break
                case 0x2: if (this.rot.z  !== x) this.rot.z  = x; break
                case 0x3: if (this.rot.vx !== x) this.rot.vx = x; break
                case 0x4: if (this.rot.vy !== x) this.rot.vy = x; break
                case 0x5: if (this.rot.vz !== x) this.rot.vz = x; break
                case 0x6: if (this.rot.ax !== x) this.rot.ax = x; break
                case 0x7: if (this.rot.ay !== x) this.rot.ay = x; break
                case 0x8: if (this.rot.az !== x) this.rot.az = x; break
                case 0x9: if (this.rot.fx !== x) this.rot.fx = x; break
                case 0xA: if (this.rot.fy !== x) this.rot.fy = x; break
                case 0xB: if (this.rot.fz !== x) this.rot.fz = x; break
            }
        }
        changeAngle(choice: number, x: number) {
            if (this.isDel()) return
            switch (choice) {
                case 0x0: if (0 !== x) this.rot.x  += x; break
                case 0x1: if (0 !== x) this.rot.y  += x; break
                case 0x2: if (0 !== x) this.rot.z  += x; break
                case 0x3: if (0 !== x) this.rot.vx += x; break
                case 0x4: if (0 !== x) this.rot.vy += x; break
                case 0x5: if (0 !== x) this.rot.vz += x; break
                case 0x6: if (0 !== x) this.rot.ax += x; break
                case 0x7: if (0 !== x) this.rot.ay += x; break
                case 0x8: if (0 !== x) this.rot.az += x; break
                case 0x9: if (0 !== x) this.rot.fx += x; break
                case 0xA: if (0 !== x) this.rot.fy += x; break
                case 0xB: if (0 !== x) this.rot.fz += x; break
            }
        }
        getAngle(choice: number) {
            if (this.isDel()) return NaN
            switch (choice) {
                case 0x0: return this.rot.x;
                case 0x1: return this.rot.y;
                case 0x2: return this.rot.z;
                case 0x3: return this.rot.vx;
                case 0x4: return this.rot.vy;
                case 0x5: return this.rot.vz;
                case 0x6: return this.rot.ax;
                case 0x7: return this.rot.ay;
                case 0x8: return this.rot.az;
                case 0x9: return this.rot.fx;
                case 0xA: return this.rot.fy;
                case 0xB: return this.rot.fz;
            } return NaN
        }
    
        setPos(choice: number, x: number) {
            if (this.isDel()) return
            switch (choice) {
                case 0x0: if (this.pos.x  !== x) this.pos.x  = x; break
                case 0x1: if (this.pos.y  !== x) this.pos.y  = x; break
                case 0x2: if (this.pos.z  !== x) this.pos.z  = x; break
                case 0x3: if (this.pos.vx !== x) this.pos.vx = x; break
                case 0x4: if (this.pos.vy !== x) this.pos.vy = x; break
                case 0x5: if (this.pos.vz !== x) this.pos.vz = x; break
                case 0x6: if (this.pos.ax !== x) this.pos.ax = x; break
                case 0x7: if (this.pos.ay !== x) this.pos.ay = x; break
                case 0x8: if (this.pos.az !== x) this.pos.az = x; break
                case 0x9: if (this.pos.fx !== x) this.pos.fx = x; break
                case 0xA: if (this.pos.fy !== x) this.pos.fy = x; break
                case 0xB: if (this.pos.fz !== x) this.pos.fz = x; break
            }
        }
        changePos(choice: number, x: number) {
            if (this.isDel()) return
            switch (choice) {
                case 0x0: if (0 !== x) this.pos.x  += x; break
                case 0x1: if (0 !== x) this.pos.y  += x; break
                case 0x2: if (0 !== x) this.pos.z  += x; break
                case 0x3: if (0 !== x) this.pos.vx += x; break
                case 0x4: if (0 !== x) this.pos.vy += x; break
                case 0x5: if (0 !== x) this.pos.vz += x; break
                case 0x6: if (0 !== x) this.pos.ax += x; break
                case 0x7: if (0 !== x) this.pos.ay += x; break
                case 0x8: if (0 !== x) this.pos.az += x; break
                case 0x9: if (0 !== x) this.pos.fx += x; break
                case 0xA: if (0 !== x) this.pos.fy += x; break
                case 0xB: if (0 !== x) this.pos.fz += x; break
            }
        }
        getPos(choice: number) {
            if (this.isDel()) return NaN
            switch (choice) {
                case 0x0: return this.pos.x;
                case 0x1: return this.pos.y;
                case 0x2: return this.pos.z;
                case 0x3: return this.pos.vx;
                case 0x4: return this.pos.vy;
                case 0x5: return this.pos.vz;
                case 0x6: return this.pos.ax;
                case 0x7: return this.pos.ay;
                case 0x8: return this.pos.az;
                case 0x9: return this.pos.fx;
                case 0xA: return this.pos.fy;
                case 0xB: return this.pos.fz;
            } return NaN
        }
    
    }
    
    export class model extends base {
    
        _faces: Polymesh.Face[]; _points: Polymesh.Vector3[]; pivot: Polymesh.Vector3; rotated: Polymesh.Vector3[]; areaRotated: Polymesh.pt2_2;
        flag: Polymesh.FlagMesh; curcam: view;
        data: {[id: string]: any}; kind: number; idx: number; scale: number;

        isOutOfArea(camera: view) {
            
        }

        rotateToView(width: number, height: number, cam?: view) {
            if (cam) this.curcam = cam;
            const centerX = width >>> 1, centerY = height >>> 1;

            let tmp = 0
            const cosX = fcos(this.curcam.rot.x), sinX = fsin(this.curcam.rot.x);
            const cosY = fcos(this.curcam.rot.y), sinY = fsin(this.curcam.rot.y);
            const cosZ = fcos(this.curcam.rot.z), sinZ = fsin(this.curcam.rot.z);

            this.areaRotated = new pt2_2(
                width, height,
                -1, -1,
            )

            // Transform vertices
            this.rotated = msh.pointCam((v) => {
                let x = v.x - this.pos.x;
                let y = v.y - this.pos.y;
                let z = v.z - this.pos.z;
                tmp = x * cosY + z * sinY, z = -x * sinY + z * cosY, x = tmp; // --- rotate around y ---
                tmp = y * cosX - z * sinX, z = y * sinX + z * cosX, y = tmp; // --- rotate around x ---
                tmp = x * cosZ - y * sinZ, y = x * sinZ + y * cosZ, x = tmp; // --- rotate around z ---

                const vsum = 1.1 * finv(psqrt((x * x) + (y * y) + (z * z)))
                // camera offset
                x += (x === 0 ? 0 : Math.sign(x) * vsum);
                y += (y === 0 ? 0 : Math.sign(y) * vsum);
                z += (z === 0 ? 0 : Math.sign(z) * vsum);
                // Perspective
                const scale = Math.abs(cam.near) * finv(Math.abs(cam.near) + z);
                const result = new Vector3(
                    centerX + (x * scale * zoom),
                    centerY + (y * scale * zoom),
                    z
                );

                this.areaRotated.x0 = Math.min(result.x, this.areaRotated.x0);
                this.areaRotated.y0 = Math.min(result.y, this.areaRotated.y0);
                this.areaRotated.x1 = Math.max(result.x, this.areaRotated.x1);
                this.areaRotated.y1 = Math.max(result.y, this.areaRotated.y1);

                return result;
            });
        }
    
        set faces(vals: {indices: number[], color: number, offset?: number, scale?: number, img?: Image}[]) {
            if (vals == null) { this._faces = null; return; }
            this._faces = vals.map((v) => (new Polymesh.Face(v.indices, v.color, v.offset, v.scale, v.img)));
        }
    
        get faces() {
            return this._faces;
        }
    
        set points(vals: {x: number, y: number, z: number}[]) {
            if (vals == null) { this._points = null; return; }
            this._points = vals.map((v) => (new Polymesh.Vector3(v.x, v.y, v.z)));
        }
    
        get points() {
            return this._points;
        }
    
        //% blockId=poly_kind_set
        //% blockNamespace=Polymesh
        //% block=" $this set kind to $id"
        //% this.shadow=variables_get this.defl=myMesh
        //% id.shadow=poly_kind_shadow
        //% group="mesh kind"
        //% weight=11
        setKind(id: number) {
            id |= 0;
            if (this.kind === id) return;
            Polymesh.__meshes_upd_kind(this, id)
        }
    
        //% blockId=poly_kind_get
        //% blockNamespace=Polymesh
        //% block=" $this get kind"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="mesh kind"
        //% weight=9
        getKind() {
            return this.kind;
        }
    
        protected makeFaceImgStack(idx: number, img: Image) {
            //if (this.faces_imgs_cache_stack.length - 1 < idx) while (this.faces_imgs_cache_stack.length - 1 < idx) this.faces_imgs_cache_stack.push([]);
            //this.faces_imgs_cache_stack[idx].unshift(img);
            if (this.faces_imgs_cache_stack[idx].length > 8) {
                const oldImg = this.faces_imgs_cache_stack[idx].pop();
                const oldidx = this.faces_imgs[idx].imgID.indexOf(hashImage(oldImg))
                this.faces_imgs[idx].imgDB[oldidx] = [];
                this.faces_imgs[idx].imgID[oldidx] = null;
            }
        }
    
        protected newFaceImgStack(idx: number, img: Image) {
            if (this.faces_imgs_cache_stack.length - 1 < idx) while (this.faces_imgs_cache_stack.length - 1 < idx) this.faces_imgs_cache_stack.push([]);
            this.faces_imgs_cache_stack[idx].unshift(img);
        }
    
        protected createFacesImgLODcache() {
            this.faces_imgs = this.faces.map(_ => (new Polymesh.FaceImg()))
            this.faces_imgs_cache_stack = this.faces.map(_ => ([]))
        }
    
        protected resetFacesImgLODcache(idx: number) {
            this.faces_imgs[idx].imgID = [];
            this.faces_imgs_cache_stack[idx] = []
        }
    
        protected updImgLodCache() {
            if (!this.flag.mipmap) return;
            const imgNewData = this.faces_imgs.filter((v, i) => {
                const cimg = this.faces[i].img
                if (!cimg) return false;
                this.makeFaceImgStack(i, cimg)
                const hidx = v.imgID.indexOf(hashImage(cimg))
                return v.imgID[hidx] != null;
            })
            if (imgNewData.length <= 0) return;
            const imgNewDataInds = imgNewData.map((_, i) => i)
            while (imgNewDataInds.length > 0) {
                const idx = imgNewDataInds.pop()
                this.updFaceImg(idx)
            };
        }
    
        protected updImgLodCacheSlot() {
            if (!this.flag.mipmap) return;
            if (this.faces_imgs.length === this.faces.length) return;
            if (this.faces.length > this.faces_imgs.length) {
                while (this.faces.length > this.faces_imgs.length) {
                    this.faces_imgs.push( new Polymesh.FaceImg())
                }
            } else if (this.faces.length < this.faces_imgs.length) {
                while (this.faces.length < this.faces_imgs.length) {
                    this.faces_imgs.pop()
                }
            }
            const newLODcache = this.faces.map((v, i) => {
                if (!v.img) return new Polymesh.FaceImg();
                if (this.faces_imgs[i]) return this.faces_imgs[i];
                return new Polymesh.FaceImg();
            });
            this.faces_imgs = newLODcache
        }
    
        protected updFaceImg(idx: number, im?: Image) {
            const cimg = im ? im : (this.faces[idx].img ? this.faces[idx].img : null);
            if (!cimg) return;
            const square = Polymesh.gcd(cimg.width, cimg.height) * Math.abs(cimg.width * cimg.height)
            if (!this.faces_imgs[idx]) this.faces_imgs[idx] = new Polymesh.FaceImg()
            let hidx = this.faces_imgs[idx].imgID.indexOf(hashImage(cimg));
            if (!this.faces_imgs[idx].imgDB[hidx]) this.faces_imgs[idx].imgDB[hidx] = [];
            else if (this.faces_imgs[idx].imgDB[hidx] != null && this.faces_imgs[idx].imgDB[hidx][this.faces_imgs[idx].imgDB[hidx].length - 1].equals(cimg)) return;
            if (hidx < 0) this.faces_imgs[idx].imgID.push(hashImage(cimg)), hidx = this.faces_imgs[idx].imgID.length - 1;
            this.newFaceImgStack(idx, cimg)
            this.faces_imgs[idx].imgDB[hidx] = [];
            if (Polymesh.isEmptyImage(cimg)) {
                this.faces_imgs[idx].imgDB[hidx].push(image.create(cimg.width, cimg.height));
                return;
            }
            let img = image.create(1, 1), scale = 0.2;
            while (img.width < cimg.width || img.height < cimg.height) {
                Polymesh.resizeImage(cimg.clone(), img, true);
                this.faces_imgs[idx].imgDB[hidx].push(img.clone());
                const scaleD = scale;
                img = image.create(Math.max(1, Math.trunc(scaleD * cimg.width)), Math.max(1, Math.trunc(scaleD * cimg.height)));
                scale += square * (scale * 0.00005);
            } this.faces_imgs[idx].imgDB[hidx].push(cimg.clone());
        }
    
        protected faces_imgs: Polymesh.FaceImg[]; protected faces_imgs_cache_stack: Image[][];
        get vfaces(): Polymesh.FaceLOD[] {
            if (this.isDel()) return null
            return this.faces.map((v, i) => {
                if (v.img) {
                    const hidx = this.faces_imgs[i].imgID.indexOf(Polymesh.hashImage(v.img))
                    return new Polymesh.FaceLOD(
                        v.indices, v.color,
                        v.offset, v.scale,
                        v.img, this.faces_imgs[i].imgDB[hidx] ? this.faces_imgs[i].imgDB[hidx] : [v.img]
                    );
                }
                return new Polymesh.FaceLOD(
                    v.indices, v.color,
                    v.offset, v.scale
                )
            })
        }

        makeScale(v: Vector3) {
            return new Vector3(v.x * this.scale, v.y * this.scale, v.z * this.scale);
        }
    
        pointCam<T>(f: (v: Polymesh.Vector3) => T|Polymesh.Vector3) {
            return this._points.map(v => {
                const vscale = this.makeScale(v);
                const vpoint = new Polymesh.Vector3(this.pos.x + vscale.x, this.pos.y + vscale.y, this.pos.z + vscale.z );
                const vpivot = new Polymesh.Vector3(this.pos.x + this.pivot.x, this.pos.y + this.pivot.y, this.pos.z + this.pivot.z );
                return f(Polymesh.rotatePoint3Dxyz(vpoint, vpivot, this.rot.toVector()));
            })
        };
    
        __onLoop() {
            this.updImgLodCacheSlot();
            this.updImgLodCache();
        }
    
        init() {
            this.curview = camview;
            this.data = {};
            this._faces = [];
            this._points = [];
            this.pivot = new Polymesh.Vector3(0, 0, 0);
            this.flag = new Polymesh.FlagMesh();
            this.createFacesImgLODcache();
        }
    
        constructor(kind: number, idx: number) {
            super();
            this.scale = 1;
            this.kind = kind || 0;
            this.kind |= 0;
            this.idx = idx || 0;
            this.idx |= 0;
        }
    
        __onDel() {
            this.faces_imgs_cache_stack = null;
            this.faces_imgs = null;
            this.faces = null;
            this.points = null;
            this.pivot = null;
            this.flag = null;
            this.data = null;
            Polymesh.__meshes_del(this);
        }
    
        //% blockId=poly_dist_del
        //% blockNamespace=Polymesh
        //% block="delete $this"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh util"
        //% weight=15
        del() {
            super.del();
        }
    
        //% blockId=poly_dist_isdel
        //% blockNamespace=Polymesh
        //% block=" $this is deleted"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh util"
        //% weight=13
        isDel() {
            return super.isDel();
        }
    
        //% blockId=poly_dist_zdist
        //% blockNamespace=Polymesh
        //% block=" $this get view distance"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh util"
        //% weight=7
        zDist() {
            if (this.isDel()) return NaN;
            return Polymesh.meshDistZ(this) * Polymesh.NORMAL_DIST;
        }
    
        //% blockId=poly_dist_zdepth
        //% blockNamespace=Polymesh
        //% block=" $this as Z of depth"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh util"
        //% weight=6
        zDepth() {
            if (this.isDel()) return NaN;
            return Polymesh.meshDepthZ(this);
        }
    
        //% blockId=poly_dist_camera
        //% blockNamespace=Polymesh
        //% block=" $this get distance from camera"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh util"
        //% weight=8
        distFromCamera() {
            if (this.isDel()) return NaN
            const distPos = new Polymesh.Vector3( Polymesh.camview.pos.x - this.pos.x, Polymesh.camview.pos.y - this.pos.y, Polymesh.camview.pos.z - this.pos.z );
            const distSum = (distPos.x * distPos.x) + (distPos.y * distPos.y) + (distPos.z * distPos.z)
            return psqrt(distSum)
        }
    
        //% blockId=poly_dist_othermesh
        //% blockNamespace=Polymesh
        //% block=" $this get distance from $otherMesh"
        //% this.shadow=variables_get this.defl=myMesh
        //% otherMesh.shadow=variables_get otherMesh.defl=otherMesh
        //% group="Mesh util"
        //% weight=9
        distBetween(otherMesh: model) {
            if (otherMesh.isDel()) return NaN
            if (this.isDel()) return NaN
            const distPos = new Polymesh.Vector3( otherMesh.pos.x - this.pos.x, otherMesh.pos.y - this.pos.y, otherMesh.pos.z - this.pos.z )
            const distSum = (distPos.x * distPos.x) + (distPos.y * distPos.y) + (distPos.z * distPos.z)
            return psqrt(distSum)
        }
    
        //% blockId=poly_normal_speed
        //% blockNamespace=Polymesh
        //% block=" $this get normal speed"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh util"
        //% weight=10
        normalSpeed() {
            if (this.isDel()) return NaN
            const distPosV = new Polymesh.Vector3(this.pos.vx, this.pos.vy, this.pos.vz)
            const distSum = (distPosV.x * distPosV.x) + (distPosV.y * distPosV.y) + (distPosV.z * distPosV.z)
            return psqrt(distSum)
        }
    
        //% blockId=poly_flag_set
        //% blockNamespace=Polymesh
        //% block="$this set flag of $flag right? $ok=toggleYesNo"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Flag mesh"
        //% weight=10
        setFlag(flag: MeshFlags, ok: boolean) {
            if (this.isDel()) return
            switch (flag) {
                case 0x0: default: this.flag.invisible = ok; break;
                case 0x1:          this.flag.cull      = ok; break;
                case 0x2:          this.flag.mipmap    = ok; break;
                case 0x3:          this.flag.lod       = ok; break;
            }
        }
    
        //% blockId=poly_flag_get
        //% blockNamespace=Polymesh
        //% block=" $this get flag of $flag"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Flag mesh"
        //% weight=5
        getFlag(flag: MeshFlags) {
            if (this.isDel()) return null
            switch (flag) {
                case 0x0: default: return this.flag.invisible;
                case 0x1:          return this.flag.cull;
                case 0x2:          return this.flag.mipmap;
                case 0x3:          return this.flag.lod;
            }
            return false
        }
    
        //% blockId=poly_vertice_set
        //% blockNamespace=Polymesh
        //% block=" $this set vertice at $idx to $point3"
        //% point3.shadow=poly_shadow_point3
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh property"
        //% weight=10
        setVertice(idx: number, point3: Polymesh.shadowPoint3) {
            if (this.isDel()) return
            if (Polymesh.isOutOfRange(idx, this.points.length + 1)) return;
            this._points[idx] = new Polymesh.Vector3(point3.x, point3.y, point3.z);
        }
    
        //% blockId=poly_vertice_add
        //% blockNamespace=Polymesh
        //% block=" $this add vertice to $point3"
        //% point3.shadow=poly_shadow_point3
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh property"
        //% weight=9
        addVertice(point3: Polymesh.shadowPoint3) {
            if (this.isDel()) return
            this._points.push(new Polymesh.Vector3(point3.x, point3.y, point3.z))
        }
    
        //% blockId=poly_vertice_del
        //% blockNamespace=Polymesh
        //% block=" $this remove vertice|| at $idx"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh remover"
        //% weight=10
        delVertice(idx?: number) {
            if (this.isDel()) return
            if (idx) this._points.removeAt(idx);
            else this._points.pop();
        }
    
        //% blockId=poly_face_set
        //% blockNamespace=Polymesh
        //% block=" $this set face at $idx to color $c=colorindexpicker and $inds|| $clface=poly_shadow_offsetface $billscale=poly_shadow_billscale and texture $img=screen_image_picker"
        //% inds.shadow=poly_shadow_indices
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh property"
        //% weight=8
        setFace(idx: number, c: number, inds: Polymesh.shadowIndices, clface?: Polymesh.shadowOffsetFace, billscale?: Polymesh.shadowBillSize, img?: Image) {
            if (this.isDel()) return
            if (Polymesh.isOutOfRange(idx, this.faces.length + 1)) return;
            if (!billscale) billscale = new Polymesh.shadowBillSize(1)
            if (!clface) clface = new Polymesh.shadowOffsetFace(0)
            const indice = [inds.i1]
            if (inds.i2) indice.push(inds.i2);
            if (inds.i3) indice.push(inds.i3);
            if (inds.i4) indice.push(inds.i4);
            this._faces[idx] = new Polymesh.Face(indice, c, clface.oface, billscale.scale, null);
            if (img) this._faces[idx].img = img.clone();
            this.updFaceImg(idx)
        }
    
        //% blockId=poly_face_add
        //% blockNamespace=Polymesh
        //% block=" $this add face to color $c=colorindexpicker and $inds|| $clface=poly_shadow_offsetface $billscale=poly_shadow_billscale and texture $img=screen_image_picker"
        //% inds.shadow=poly_shadow_indices
        //% oface.min=-1 oface.max=1
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh property"
        //% weight=7
        addFace(c: number, inds: Polymesh.shadowIndices, clface?: Polymesh.shadowOffsetFace, billscale?: Polymesh.shadowBillSize, img?: Image) {
            if (this.isDel()) return
            if (!billscale) billscale = new Polymesh.shadowBillSize(1)
            if (!clface) clface = new Polymesh.shadowOffsetFace(0)
            const indice = [inds.i1]
            if (inds.i2) indice.push(inds.i2);
            if (inds.i3) indice.push(inds.i3);
            if (inds.i4) indice.push(inds.i4);
            if (img) this._faces.push(new Polymesh.Face( indice, c, clface.oface, billscale.scale, img.clone() ));
            else this._faces.push(new Polymesh.Face( indice, c, clface.oface, billscale.scale, null ));
            this.updFaceImg(this.faces.length - 1)
        }
    
        //% blockId=poly_face_del
        //% blockNamespace=Polymesh
        //% block=" $this remove face|| at $idx"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh remover"
        //% weight=9
        delFace(idx?: number) {
            if (this.isDel()) return
            if (idx) this._faces.removeAt(idx);
            else this._faces.pop();
        }
    
        //% blockId=poly_getfacecolor
        //% blockNamespace=Polymesh
        //% block=" $this get face color at $idx"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh face property"
        //% weight=10
        getFaceColor(idx: number) {
            if (this.isDel()) return NaN
            if (!this._faces[idx].color) return NaN
            return this._faces[idx].color
        }
    
        //% blockId=poly_setfacecolor
        //% blockNamespace=Polymesh
        //% block=" $this set face color at $idx to $c=colorindexpicker"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh face property"
        //% weight=9
        setFaceColor(idx: number, c: number) {
            if (this.isDel()) return
            if (this._faces[idx].color === c) return;
            this._faces[idx].color = c
        }
    
        //% blockId=poly_getfaceimage
        //% blockNamespace=Polymesh
        //% block=" $this get face image at $idx"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh face property"
        //% weight=8
        getFaceImage(idx: number) {
            if (this.isDel()) return null
            if (!this._faces[idx].img) return null
            return this._faces[idx].img
        }
    
        //% blockId=poly_setfaceimage
        //% blockNamespace=Polymesh
        //% block=" $this set face image at $idx to $img=image_picker|| and LOD as $imgs=lists_create_with"
        //% imgs.defl=image_picker
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh face property"
        //% weight=7
        setFaceImage(idx: number, img: Image, imgs?: Image[]) {
            if (this.isDel()) return
            if (this._faces[idx].img && this._faces[idx].img.equals(img)) return;
            this._faces[idx].img = img
            if (imgs) {
                const imgh = Polymesh.hashImage(img);
                const hidx = this.faces_imgs[idx].imgID.indexOf(imgh);
                if (hidx < 0) return;
                else this.faces_imgs[idx].imgDB[hidx] = [];
                this.faces_imgs[idx].imgDB[hidx] = imgs.slice();
                if (this.faces_imgs[idx].imgDB[hidx][this.faces_imgs[idx].imgDB[hidx].length - 1]) this.faces_imgs[idx].imgDB[hidx][this.faces_imgs[idx].imgDB[hidx].length - 1] = img.clone();
                this.makeFaceImgStack(idx, img)
            } else this.updFaceImg(idx)
        }
    
        //% blockId=poly_clearfaceimage
        //% blockNamespace=Polymesh
        //% block=" $this clear face image at $idx"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh face property"
        //% weight=6
        clearFaceImage(idx: number) {
            if (this.isDel()) return
            if (!this.faces[idx].img) return;
            this._faces[idx].img = null
            this.resetFacesImgLODcache(idx);
        }
    
        //% blockId=poly_getfaceoffset
        //% blockNamespace=Polymesh
        //% block=" $this get face offset at $idx"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh face property"
        //% weight=5
        getFaceOffset(idx: number) {
            if (this.isDel()) return NaN
            if (!this._faces[idx].offset) return NaN
            return this._faces[idx].offset
        }
    
        //% blockId=poly_setfaceoffset
        //% blockNamespace=Polymesh
        //% block=" $this set face offset at $idx to $oface"
        //% oface.min=-1 oface.max=1
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh face property"
        //% weight=4
        setFaceOffset(idx: number, oface: number) {
            if (this.isDel()) return
            if (this._faces[idx].offset === oface) return;
            this._faces[idx].offset = oface;
        }
    
        //% blockId=poly_getfacescale
        //% blockNamespace=Polymesh
        //% block=" $this get face scale at $idx"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh face property"
        //% weight=5
        getFaceScale(idx: number) {
            if (this.isDel()) return NaN
            if (!this._faces[idx].scale) return NaN;
            return this._faces[idx].scale;
        }
    
        //% blockId=poly_setfacescale
        //% blockNamespace=Polymesh
        //% block=" $this set face scale at $idx to $scale"
        //% oface.min=-1 oface.max=1
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh face property"
        //% weight=4
        setFaceScale(idx: number, scale: number) {
            if (this.isDel()) return
            if (this._faces[idx].scale === scale) return;
            this._faces[idx].scale = scale;
        }
    
        //% blockId=poly_mesh_pivot_set
        //% blockNamespace=Polymesh
        //% block=" $this set $choice to $x"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh pivot"
        //% weight=10
        setPivot(choice: PolyPivot, x: number) {
            if (this.isDel()) return
            switch (choice) {
                case 0x0: if (this.pivot.x !== x) this.pivot.x = x; break;
                case 0x1: if (this.pivot.y !== x) this.pivot.y = x; break;
                case 0x2: if (this.pivot.z !== x) this.pivot.z = x; break;
            };
        }
    
        //% blockId=poly_mesh_pivot_change
        //% blockNamespace=Polymesh
        //% block=" $this change $choice by $x"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh pivot"
        //% weight=5
        changePivot(choice: PolyPivot, x: number) {
            if (this.isDel()) return
            switch (choice) {
                case 0x0: if (this.pivot.x !== (this.pivot.x + x)) this.pivot.x += x; break;
                case 0x1: if (this.pivot.y !== (this.pivot.y + x)) this.pivot.y += x; break;
                case 0x2: if (this.pivot.z !== (this.pivot.z + x)) this.pivot.z += x; break;
            };
        }
    
        //% blockId=poly_mesh_pivot_get
        //% blockNamespace=Polymesh
        //% block=" $this get $choice"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh pivot"
        //% weight=4
        getPivot(choice: PolyPivot) {
            if (this.isDel()) return NaN
            switch (choice) {
                case 0x0: this.pivot.x;
                case 0x1: this.pivot.y;
                case 0x2: this.pivot.z;
            };
            return NaN
        }
    
        //% blockId=poly_mesh_rot_set
        //% blockNamespace=Polymesh
        //% block=" $this set $choice to $x"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh angle"
        //% weight=100
        setAngle(choice: PolyAngle, x: number) {
            super.setAngle(choice, x)
        }
    
        //% blockId=poly_mesh_rot_change
        //% blockNamespace=Polymesh
        //% block=" $this change $choice by $x"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh angle"
        //% weight=5
        changeAngle(choice: PolyAngle, x: number) {
            super.changeAngle(choice, x)
        }
    
        //% blockId=poly_mesh_rot_get
        //% blockNamespace=Polymesh
        //% block=" $this get $choice"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh angle"
        //% weight=4
        getAngle(choice: PolyAngle) {
            return super.getAngle(choice)
        }
    
        //% blockId=poly_mesh_pos_set
        //% blockNamespace=Polymesh
        //% block=" $this set $choice to $x"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh position property"
        //% weight=10
        setPos(choice: PolyPos, x: number) {
            super.setPos(choice, x)
        }
    
        //% blockId=poly_mesh_pos_change
        //% blockNamespace=Polymesh
        //% block=" $this change $choice by $x"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh position property"
        //% weight=9
        changePos(choice: PolyPos, x: number) {
            super.changePos(choice, x)
        }
    
        //% blockId=poly_mesh_pos_get
        //% blockNamespace=Polymesh
        //% block=" $this get $choice"
        //% this.shadow=variables_get this.defl=myMesh
        //% group="Mesh position property"
        //% weight=8
        getPos(choice: PolyPos) {
            return super.getPos(choice)
        }
    
    }

}
