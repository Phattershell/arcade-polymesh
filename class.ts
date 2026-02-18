
class polybase {
    protected __prop_upd: control.FrameCallback; __del: boolean; protected __unDel: boolean;

    public init() { }

    public __onLoop() { }

    loop() {
        this.__prop_upd = control.eventContext().registerFrameHandler(scene.PRE_RENDER_UPDATE_PRIORITY, () => {
            const delta = Fx8(control.eventContext().deltaTime)
            this.motionUpdateRot(delta), this.motionUpdatePos(delta);
            this.__onLoop();
        });
    }

    constructor(undel?: boolean) {
        this.__unDel = undel;
        this.__del = false;
        this.rot = { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, ax: 0, ay: 0, az: 0, fx: 0, fy: 0, fz: 0 };
        this.pos = { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, ax: 0, ay: 0, az: 0, fx: 0, fy: 0, fz: 0 };
        this.init();
        this.loop();
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

    protected rot_x:  Fx8; protected rot_y:  Fx8; protected rot_z:  Fx8;
    protected rot_vx: Fx8; protected rot_vy: Fx8; protected rot_vz: Fx8;
    protected rot_ax: Fx8; protected rot_ay: Fx8; protected rot_az: Fx8;
    protected rot_fx: Fx8; protected rot_fy: Fx8; protected rot_fz: Fx8;
    set rot(v: Polymesh.Motion3) {
        if (!v || v == null) {
            this.rot_x  = null; this.rot_y  = null; this.rot_z  = null;
            this.rot_vx = null; this.rot_vy = null; this.rot_vz = null;
            this.rot_ax = null; this.rot_ay = null; this.rot_az = null;
            this.rot_fx = null; this.rot_fy = null; this.rot_fz = null;
            return
        }
        this.rot_x  = Fx8(v.x);  this.rot_y  = Fx8(v.y);  this.rot_z  = Fx8(v.z);
        this.rot_vx = Fx8(v.vx); this.rot_vy = Fx8(v.vy); this.rot_vz = Fx8(v.vz);
        this.rot_ax = Fx8(v.vx); this.rot_ay = Fx8(v.vy); this.rot_az = Fx8(v.vz);
        this.rot_fx = Fx8(v.vx); this.rot_fy = Fx8(v.vy); this.rot_fz = Fx8(v.vz);
    }
    get rot(): Polymesh.Motion3 {
        return {
            x:  Fx.toFloat(this.rot_x),  y:  Fx.toFloat(this.rot_y),  z:  Fx.toFloat(this.rot_z),
            vx: Fx.toFloat(this.rot_vx), vy: Fx.toFloat(this.rot_vy), vz: Fx.toFloat(this.rot_vz),
            ax: Fx.toFloat(this.rot_ax), ay: Fx.toFloat(this.rot_ay), az: Fx.toFloat(this.rot_az),
            fx: Fx.toFloat(this.rot_fx), fy: Fx.toFloat(this.rot_fy), fz: Fx.toFloat(this.rot_fz),
        }
    }

    protected pos_x:  Fx8; protected pos_y:  Fx8; protected pos_z:  Fx8;
    protected pos_vx: Fx8; protected pos_vy: Fx8; protected pos_vz: Fx8;
    protected pos_ax: Fx8; protected pos_ay: Fx8; protected pos_az: Fx8;
    protected pos_fx: Fx8; protected pos_fy: Fx8; protected pos_fz: Fx8;
    set pos(v: Polymesh.Motion3) {
        if (!v || v == null) {
            this.pos_x  = null; this.pos_y  = null; this.pos_z  = null;
            this.pos_vx = null; this.pos_vy = null; this.pos_vz = null;
            this.pos_ax = null; this.pos_ay = null; this.pos_az = null;
            this.pos_fx = null; this.pos_fy = null; this.pos_fz = null;
            return
        }
        this.pos_x  = Fx8(v.x);  this.pos_y  = Fx8(v.y);  this.pos_z  = Fx8(v.z);
        this.pos_vx = Fx8(v.vx); this.pos_vy = Fx8(v.vy); this.pos_vz = Fx8(v.vz);
        this.pos_ax = Fx8(v.vx); this.pos_ay = Fx8(v.vy); this.pos_az = Fx8(v.vz);
        this.pos_fx = Fx8(v.vx); this.pos_fy = Fx8(v.vy); this.pos_fz = Fx8(v.vz);
    }
    get pos(): Polymesh.Motion3 {
        return {
            x:  Fx.toFloat(this.pos_x),  y:  Fx.toFloat(this.pos_y),  z:  Fx.toFloat(this.pos_z),
            vx: Fx.toFloat(this.pos_vx), vy: Fx.toFloat(this.pos_vy), vz: Fx.toFloat(this.pos_vz),
            ax: Fx.toFloat(this.pos_ax), ay: Fx.toFloat(this.pos_ay), az: Fx.toFloat(this.pos_az),
            fx: Fx.toFloat(this.pos_fx), fy: Fx.toFloat(this.pos_fy), fz: Fx.toFloat(this.pos_fz),
        }
    }

    protected motionUpdatePos(delta: Fx8) {
        const zeroF = Fx8(0), oneF = Fx8(1)
        // Acceleration of position
        if (this.pos_ax !== zeroF) this.pos_vx = Fx.add(this.pos_vx, Fx.mul(this.pos_ax, delta))
        if (this.pos_ay !== zeroF) this.pos_vy = Fx.add(this.pos_vy, Fx.mul(this.pos_ay, delta))
        if (this.pos_az !== zeroF) this.pos_vz = Fx.add(this.pos_vz, Fx.mul(this.pos_az, delta))

        // Friction of position
        if (this.pos_fx !== zeroF) this.pos_vx = Fx.mul(this.pos_vx, Fx.mul(Fx.sub(oneF, this.pos_fx), delta))
        if (this.pos_fy !== zeroF) this.pos_vy = Fx.mul(this.pos_vy, Fx.mul(Fx.sub(oneF, this.pos_fy), delta))
        if (this.pos_fz !== zeroF) this.pos_vz = Fx.mul(this.pos_vz, Fx.mul(Fx.sub(oneF, this.pos_fz), delta))

        // Velocity of position
        if (this.pos_vx !== zeroF) this.pos_x = Fx.add(this.pos_x, Fx.mul(this.pos_vx, delta))
        if (this.pos_vy !== zeroF) this.pos_y = Fx.add(this.pos_y, Fx.mul(this.pos_vy, delta))
        if (this.pos_vz !== zeroF) this.pos_z = Fx.add(this.pos_z, Fx.mul(this.pos_vz, delta))
    }
    protected motionUpdateRot(delta: Fx8) {
        const zeroF = Fx8(0), oneF = Fx8(1)
        // Acceleration of rotation
        if (this.rot_ax !== zeroF) this.rot_vx = Fx.add(this.rot_vx, Fx.mul(this.rot_ax, delta))
        if (this.rot_ay !== zeroF) this.rot_vy = Fx.add(this.rot_vy, Fx.mul(this.rot_ay, delta))
        if (this.rot_az !== zeroF) this.rot_vz = Fx.add(this.rot_vz, Fx.mul(this.rot_az, delta))

        // Friction of rotation
        if (this.rot_fx !== zeroF) this.rot_vx = Fx.mul(this.rot_vx, Fx.mul(Fx.sub(oneF, this.rot_fx), delta))
        if (this.rot_fy !== zeroF) this.rot_vy = Fx.mul(this.rot_vy, Fx.mul(Fx.sub(oneF, this.rot_fy), delta))
        if (this.rot_fz !== zeroF) this.rot_vz = Fx.mul(this.rot_vz, Fx.mul(Fx.sub(oneF, this.rot_fz), delta))

        // Velocity of rotation
        if (this.rot_vx !== zeroF) this.rot_x = Fx.add(this.rot_x, Fx.mul(this.rot_vx, delta))
        if (this.rot_vy !== zeroF) this.rot_y = Fx.add(this.rot_y, Fx.mul(this.rot_vy, delta))
        if (this.rot_vz !== zeroF) this.rot_z = Fx.add(this.rot_z, Fx.mul(this.rot_vz, delta))
    }

    setAngle(choice: number, x: number) {
        if (this.isDel()) return
        const xF = Fx8(x)
        switch (choice) {
            case 0x0: if (this.rot_x  !== xF) this.rot_x  = xF; break
            case 0x1: if (this.rot_y  !== xF) this.rot_y  = xF; break
            case 0x2: if (this.rot_z  !== xF) this.rot_z  = xF; break
            case 0x3: if (this.rot_vx !== xF) this.rot_vx = xF; break
            case 0x4: if (this.rot_vy !== xF) this.rot_vy = xF; break
            case 0x5: if (this.rot_vz !== xF) this.rot_vz = xF; break
            case 0x6: if (this.rot_ax !== xF) this.rot_ax = xF; break
            case 0x7: if (this.rot_ay !== xF) this.rot_ay = xF; break
            case 0x8: if (this.rot_az !== xF) this.rot_az = xF; break
            case 0x9: if (this.rot_fx !== xF) this.rot_fx = xF; break
            case 0xA: if (this.rot_fy !== xF) this.rot_fy = xF; break
            case 0xB: if (this.rot_fz !== xF) this.rot_fz = xF; break
        }
    }
    changeAngle(choice: number, x: number) {
        if (this.isDel()) return
        const xF = Fx8(x)
        switch (choice) {
            case 0x0: if (this.rot_x  !== Fx.add(this.rot_x,  xF)) this.rot_x  = Fx.add(this.rot_x,  xF); break
            case 0x1: if (this.rot_y  !== Fx.add(this.rot_y,  xF)) this.rot_y  = Fx.add(this.rot_y,  xF); break
            case 0x2: if (this.rot_z  !== Fx.add(this.rot_z,  xF)) this.rot_z  = Fx.add(this.rot_z,  xF); break
            case 0x3: if (this.rot_vx !== Fx.add(this.rot_vx, xF)) this.rot_vx = Fx.add(this.rot_vx, xF); break
            case 0x4: if (this.rot_vy !== Fx.add(this.rot_vy, xF)) this.rot_vy = Fx.add(this.rot_vy, xF); break
            case 0x5: if (this.rot_vz !== Fx.add(this.rot_vz, xF)) this.rot_vz = Fx.add(this.rot_vz, xF); break
            case 0x6: if (this.rot_ax !== Fx.add(this.rot_ax, xF)) this.rot_ax = Fx.add(this.rot_ax, xF); break
            case 0x7: if (this.rot_ay !== Fx.add(this.rot_ay, xF)) this.rot_ay = Fx.add(this.rot_ay, xF); break
            case 0x8: if (this.rot_az !== Fx.add(this.rot_az, xF)) this.rot_az = Fx.add(this.rot_az, xF); break
            case 0x9: if (this.rot_fx !== Fx.add(this.rot_fx, xF)) this.rot_fx = Fx.add(this.rot_fx, xF); break
            case 0xA: if (this.rot_fy !== Fx.add(this.rot_fy, xF)) this.rot_fy = Fx.add(this.rot_fy, xF); break
            case 0xB: if (this.rot_fz !== Fx.add(this.rot_fz, xF)) this.rot_fz = Fx.add(this.rot_fz, xF); break
        }
    }
    getAngle(choice: number) {
        if (this.isDel()) return NaN
        switch (choice) {
            case 0x0: return Fx.toFloat(this.rot_x);
            case 0x1: return Fx.toFloat(this.rot_y);
            case 0x2: return Fx.toFloat(this.rot_z);
            case 0x3: return Fx.toFloat(this.rot_vx);
            case 0x4: return Fx.toFloat(this.rot_vy);
            case 0x5: return Fx.toFloat(this.rot_vz);
            case 0x6: return Fx.toFloat(this.rot_ax);
            case 0x7: return Fx.toFloat(this.rot_ay);
            case 0x8: return Fx.toFloat(this.rot_az);
            case 0x9: return Fx.toFloat(this.rot_fx);
            case 0xA: return Fx.toFloat(this.rot_fy);
            case 0xB: return Fx.toFloat(this.rot_fz);
        } return NaN
    }

    setPos(choice: number, x: number) {
        if (this.isDel()) return
        const xF = Fx8(x)
        switch (choice) {
            case 0x0: if (this.pos_x  !== xF) this.pos_x  = xF; break
            case 0x1: if (this.pos_y  !== xF) this.pos_y  = xF; break
            case 0x2: if (this.pos_z  !== xF) this.pos_z  = xF; break
            case 0x3: if (this.pos_vx !== xF) this.pos_vx = xF; break
            case 0x4: if (this.pos_vy !== xF) this.pos_vy = xF; break
            case 0x5: if (this.pos_vz !== xF) this.pos_vz = xF; break
            case 0x6: if (this.pos_ax !== xF) this.pos_ax = xF; break
            case 0x7: if (this.pos_ay !== xF) this.pos_ay = xF; break
            case 0x8: if (this.pos_az !== xF) this.pos_az = xF; break
            case 0x9: if (this.pos_fx !== xF) this.pos_fx = xF; break
            case 0xA: if (this.pos_fy !== xF) this.pos_fy = xF; break
            case 0xB: if (this.pos_fz !== xF) this.pos_fz = xF; break
        }
    }
    changePos(choice: number, x: number) {
        if (this.isDel()) return
        const xF = Fx8(x)
        switch (choice) {
            case 0x0: if (this.pos_x  !== Fx.add(this.pos_x,  xF)) this.pos_x  = Fx.add(this.pos_x,  xF); break
            case 0x1: if (this.pos_y  !== Fx.add(this.pos_y,  xF)) this.pos_y  = Fx.add(this.pos_y,  xF); break
            case 0x2: if (this.pos_z  !== Fx.add(this.pos_z,  xF)) this.pos_z  = Fx.add(this.pos_z,  xF); break
            case 0x3: if (this.pos_vx !== Fx.add(this.pos_vx, xF)) this.pos_vx = Fx.add(this.pos_vx, xF); break
            case 0x4: if (this.pos_vy !== Fx.add(this.pos_vy, xF)) this.pos_vy = Fx.add(this.pos_vy, xF); break
            case 0x5: if (this.pos_vz !== Fx.add(this.pos_vz, xF)) this.pos_vz = Fx.add(this.pos_vz, xF); break
            case 0x6: if (this.pos_ax !== Fx.add(this.pos_ax, xF)) this.pos_ax = Fx.add(this.pos_ax, xF); break
            case 0x7: if (this.pos_ay !== Fx.add(this.pos_ay, xF)) this.pos_ay = Fx.add(this.pos_ay, xF); break
            case 0x8: if (this.pos_az !== Fx.add(this.pos_az, xF)) this.pos_az = Fx.add(this.pos_az, xF); break
            case 0x9: if (this.pos_fx !== Fx.add(this.pos_fx, xF)) this.pos_fx = Fx.add(this.pos_fx, xF); break
            case 0xA: if (this.pos_fy !== Fx.add(this.pos_fy, xF)) this.pos_fy = Fx.add(this.pos_fy, xF); break
            case 0xB: if (this.pos_fz !== Fx.add(this.pos_fz, xF)) this.pos_fz = Fx.add(this.pos_fz, xF); break
        }
    }
    getPos(choice: number) {
        if (this.isDel()) return NaN
        switch (choice) {
            case 0x0: return Fx.toFloat(this.pos_x);
            case 0x1: return Fx.toFloat(this.pos_y);
            case 0x2: return Fx.toFloat(this.pos_z);
            case 0x3: return Fx.toFloat(this.pos_vx);
            case 0x4: return Fx.toFloat(this.pos_vy);
            case 0x5: return Fx.toFloat(this.pos_vz);
            case 0x6: return Fx.toFloat(this.pos_ax);
            case 0x7: return Fx.toFloat(this.pos_ay);
            case 0x8: return Fx.toFloat(this.pos_az);
            case 0x9: return Fx.toFloat(this.pos_fx);
            case 0xA: return Fx.toFloat(this.pos_fy);
            case 0xB: return Fx.toFloat(this.pos_fz);
        } return NaN
    }

}

class polyview extends polybase {

    zBuffer: Buffer;
    cBuffer: Buffer;
    buf: Buffer;
    img: Image;
    near: number;
    width: number;
    height: number;
    far: number;

    private readonly pos2idx = (a: number, r: number, b: number) => (a * r) + b;

    private readonly isOutOfRange = (n: number, r: number) => (n < 0 || n >= r);
    private isOutOfArea(x: number, y: number) { return (this.isOutOfRange(x, this.width) || this.isOutOfRange(y, this.height)) };
    private isOutOfAreas(xs: number[], ys: number[]) { return xs.some((_, i) => this.isOutOfRange(xs[i], ys[i]))};

    setScene(img: Image) {
        if (!this.img) this.img = img, this.zBuffer = pins.createBuffer(this.img.width * this.img.height), this.cBuffer = pins.createBuffer(this.img.width * this.img.height), this.width = this.img.width, this.height = this.img.height, this.buf = pins.createBuffer(this.height);
        else if (this.img.width !== img.width || this.img.height !== img.height) this.img = img, this.zBuffer = pins.createBuffer(this.img.width * this.img.height), this.cBuffer = pins.createBuffer(this.img.width * this.img.height), this.width = this.img.width, this.height = this.img.height, this.buf = pins.createBuffer(this.height);
    }

    setRenderRange(near: number, far: number) {
        if (this.near !== near) this.near = near;
        if (this.far  !== far)  this.far  = far;
    }

    private distToUint8(z: number) {
        if (z < this.near) return 0x00;
        if (z > this.far) return 0xff
        return Math.map(z, this.near, this.far, 0x00, 0xff) >> 0;
    }

    setDot(x: number, y: number, z: number, c: number) {
        if (this.isOutOfArea(x, y)) return;
        const i = this.pos2idx(x, this.height, y);
        const zUint8 = this.distToUint8(z);
        if (z <= 0x00 || z >= 0xff) return;
        if (this.zBuffer[i] > zUint8) return;
        this.cBuffer[i] = c;
        this.zBuffer[i] = zUint8;
    }

    drawLine(x0: number, y0: number, x1: number, y1: number, z: number, color: number, idx?: number) {
        color &= 0xF;
        if (x0 === x1 && y0 === y1) { this.setDot(fxpic, x0, y0, z, color); return; }
        const w = this.width;
        const h = this.height;
        const iw = idx * w;
        if ((x0 < 0 && x1 < 0) || (x0 >= w && x1 >= w) ||
            (y0 < 0 && y1 < 0) || (y0 >= h && y1 >= h)) return;

        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let sx = Math.clamp(-1, 1, x1 - x0);
        let sy = Math.clamp(-1, 1, y1 - y0);
        let err = dx - dy;

        while (1) {
            if (((sx < 0 && x0 < 0) || (sx > 0 && x0 >= w) && sx !== 0) ||
                ((sy < 0 && y0 < 0) || (sy > 0 && y0 >= h) && sy !== 0)) break;
            this.setDot(fxpic, x0, y0, z, color);

            // ตรวจทิศทาง + เกินจุดหมายหรือยัง (ป้องกัน overflow)
            if (((sx > 0 && x0 >= x1) || (sx < 0 && x0 <= x1) && sx !== 0) ||
                ((sy > 0 && y0 >= y1) || (sy < 0 && y0 <= y1) && sy !== 0)) break;

            let e2 = err << 1;
            if (e2 > -dy) { err -= dy; x0 += sx; }
            if (e2 < dx) { err += dx; y0 += sy; }
        }
    }

    setRows(x: number, src: Buffer, z: number) {
        const zUint8 = this.distToUint8(z);
        if (zUint8 <= 0x00 || zUint8 >= 0xff) return;
        const n = x * this.height;
        const m = Math.min(this.height, src.length)
        for (let i = 0; i < m; i++) {
            const i_n = i + n;
            if (this.zBuffer[i_n] > zUint8) continue;
            this.zBuffer[i_n] = zUint8;
            this.cBuffer[i_n] = src[i];
        }
    }

    getRows(x: number, src_c: Buffer, src_z?: Buffer) {
        const ix = x * this.height;
        this.buf.write(ix, this.cBuffer);
        src_c.write(0, this.buf);
        if (!src_z) return;
        this.buf.write(ix, this.zBuffer);
        src_z.write(0, this.buf);
    }

    getPixel(x: number, y: number) {
        return this.cBuffer[this.pos2idx(x, this.height, y)]
    }

    getDepth(x: number, y: number) {
        return this.zBuffer[this.pos2idx(x, this.height, y)]
    }

    // คืน bounding box ที่ clip กับภาพแล้ว [minX, maxX, minY, maxY]
    getClippedBounds(
        xCoords: number[],  // x ของจุดต่าง ๆ
        yCoords: number[]   // y ของจุดต่าง ๆ
    ): number[] {
        const w = this.width;
        const h = this.height;

        let minX = w;
        let maxX = -1;
        let minY = h;
        let maxY = -1;

        for (let i = 0; i < xCoords.length; i++) {
            const x = Math.clamp(0, totalW - 1, xCoords[i]);
            const y = Math.clamp(0, h - 1, yCoords[i]);
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }

        if (minX > maxX || minY > maxY) return [0, -1, 0, -1]; // ว่าง
        return [minX, maxX, minY, maxY];
    }

    // manual sort 3 จุดตาม x (คืน index เรียงจาก x น้อย → มาก)
    private sortTrianglePointsByX(
        x0: number, y0: number,
        x1: number, y1: number,
        x2: number, y2: number
    ): number[] {  // คืน [idxA, idxB, idxC] โดย xA <= xB <= xC
        if (x0 <= x1 && x0 <= x2) {
            if (x1 <= x2) return [0, 1, 2];
            return [0, 2, 1];
        }
        if (x1 <= x0 && x1 <= x2) {
            if (x0 <= x2) return [1, 0, 2];
            return [1, 2, 0];
        }
        // x2 เป็น min
        if (x0 <= x1) return [2, 0, 1];
        return [2, 1, 0];
    }

    fximgDrawTriangle(
        x0: number, y0: number,
        x1: number, y1: number,
        x2: number, y2: number,
        z: number, color: number
    ) {
        this.drawLine(fxpic, x1, y1, x0, y0, z, color, idx);
        this.drawLine(fxpic, x2, y2, x1, y1, z, color, idx);
        this.drawLine(fxpic, x0, y0, x2, y2, z, color, idx);
    }

    fillTriangle(
        x0: number, y0: number,
        x1: number, y1: number,
        x2: number, y2: number,
        z: number, color: number
    ) {

        color &= 0xF;
        const w = this.width;
        const h = this.height;
        if (this.isOutOfAreas([x0,x1,x2],[y0,y1,y2])) return;

        // bounding box clip
        const [minX, maxX, minY, maxY] = this.getClippedBounds(fxpic, [x0, x1, x2], [y0, y1, y2]);
        if (minX > maxX) return;

        // manual sort จุดตาม x
        const order = this.sortTrianglePointsByX(x0, y0, x1, y1, x2, y2);
        const xs = [x0, x1, x2];
        const ys = [y0, y1, y2];
        const xa = xs[order[0]], ya = ys[order[0]];
        const xb = xs[order[1]], yb = ys[order[1]];
        const xc = xs[order[2]], yc = ys[order[2]];

        const rowBuf = pins.createBuffer(h);

        for (let x = Math.max(0, minX | 0); x <= Math.min(w - 1, maxX | 0); x++) {
            fximgGetRows(fxpic, idx + x, rowBuf, h);

            // หา y range สำหรับ x นี้ (intersect กับ 3 ขอบ)
            let yStart = h;
            let yEnd = -1;

            // ขอบ AB
            if (xa !== xb) {
                const t = (x - xa) / (xb - xa);
                if (t >= 0 && t <= 1) {
                    const yab = ya + t * (yb - ya);
                    yStart = Math.min(yStart, yab);
                    yEnd = Math.max(yEnd, yab);
                }
            }

            // ขอบ AC
            if (xa !== xc) {
                const t = (x - xa) / (xc - xa);
                if (t >= 0 && t <= 1) {
                    const yac = ya + t * (yc - ya);
                    yStart = Math.min(yStart, yac);
                    yEnd = Math.max(yEnd, yac);
                }
            }

            // ขอบ BC (เฉพาะเมื่อ x อยู่ระหว่าง xb กับ xc)
            if (xb !== xc && x >= Math.min(xb, xc) && x <= Math.max(xb, xc)) {
                const t = (x - xb) / (xc - xb);
                const ybc = yb + t * (yc - yb);
                yStart = Math.min(yStart, ybc);
                yEnd = Math.max(yEnd, ybc);
            }

            if (yStart <= yEnd) {
                const clipYStart = Math.max(minY, Math.ceil(yStart));
                const clipYEnd = Math.min(maxY, Math.floor(yEnd));
                for (let y = clipYStart; y <= clipYEnd; y++) if (rowBuf[y] !== color) rowBuf[y] = color;
                fximgSetRows(fxpic, idx + x, rowBuf, h);
            }
        }
    }

    computeMsh(msh: polymesh) {
        
    }

    render() {
        for (let x = 0; x < this.width; x++) {
            this.buf.write(-(x * this.height), this.cBuffer);
            this.img.setRows(x, this.buf)
        }
    }

    reset() {
        this.zBuffer.fill(0);
        this.cBuffer.fill(0);
        this.img.fill(0);
    }

    constructor(undel?: boolean) {
        super(undel);
        this.setScene(scene.backgroundImage())
    }

}

class polymesh extends polybase {

    faces: Polymesh.Face[]; points: Polymesh.Vector3[]; pivot: Polymesh.Vector3;
    flag: { invisible: boolean, cull: boolean, lod: boolean, texStream: boolean };
    data: {[id: string]: any}; kind: number; idx: number;

    //% blockId=poly_kind_set
    //% blockNamespace=Polymesh
    //% block=" $this set kind to $id"
    //% this.shadow=variables_get this.defl=myMesh
    //% id.shadow=poly_kind_shadow
    //% group="mesh kind"
    //% weight=11
    setKind(id: number) {
        if (this.kind === Math.floor(id)) return;
        Polymesh.__meshes_upd_kind(this, id)
    }

    //% blockId=poly_kind_get
    //% blockNamespace=Polymesh
    //% block=" $this get kind"
    //% this.shadow=variables_get this.defl=myMesh
    //% group="mesh kind"
    //% weight=9
    getKind() {
        return Math.floor(this.kind);
    }

    protected makeFaceImgStack(idx: number, img: Image) {
        this.faces_imgs_cache_stack[idx].unshift(img);
        if (this.faces_imgs_cache_stack[idx].length > 8) {
            const oldImg = this.faces_imgs_cache_stack[idx].pop();
            const oldImgh = Polymesh.hashImage(oldImg);
            delete this.faces_imgs[idx][oldImgh]
        }
    }

    protected createFacesImgLODcache() {
        this.faces_imgs = this.faces.map(_ => ({}))
        this.faces_imgs_cache_stack = this.faces.map(_ => ([]))
    }

    protected resetFacesImgLODcache(idx: number) {
        this.faces_imgs[idx] = {}
        this.faces_imgs_cache_stack[idx] = []
    }

    protected updImgLodCache() {
        if (!this.flag.texStream) return;
        const imgNewData = this.faces_imgs.filter((v, i) => {
            const cimg = this.faces[i].img
            if (!cimg) return false;
            this.makeFaceImgStack(i, cimg)
            const imgh = Polymesh.hashImage(cimg)
            return !v[imgh];
        })
        if (imgNewData.length <= 0) return;
        const imgNewDataInds = imgNewData.map((_, i) => i)
        while (imgNewDataInds.length > 0) {
            const idx = imgNewDataInds.pop()
            this.updFaceImg(idx)
        };
    }

    protected updImgLodCacheSlot() {
        if (!this.flag.texStream) return;
        if (this.faces_imgs.length === this.faces.length) return;
        if (this.faces.length > this.faces_imgs.length) {
            while (this.faces.length > this.faces_imgs.length) {
                this.faces_imgs.push({})
            }
        } else if (this.faces.length < this.faces_imgs.length) {
            while (this.faces.length < this.faces_imgs.length) {
                this.faces_imgs.pop()
            }
        }
        /*
        const newLODcache = this.faces.map((v, i) => {
            if (!v.img) return {};
            if (this.faces_imgs[i]) return this.faces_imgs[i];
            return {};
        });
        this.faces_imgs = newLODcache
        */
    }

    protected updFaceImg(idx: number, im?: Image) {
        const cimg = im ? im : (this.faces[idx].img ? this.faces[idx].img : null);
        if (!cimg) return;
        const square = Polymesh.gcd(cimg.width, cimg.height)
        const imgh = Polymesh.hashImage(cimg)
        if (!this.faces_imgs[idx]) this.faces_imgs[idx] = {}
        else if (this.faces_imgs[idx][imgh] && this.faces_imgs[idx][imgh][this.faces_imgs[idx][imgh].length - 1].equals(cimg)) return;
        this.faces_imgs[idx][imgh] = [];
        if (Polymesh.isEmptyImage(cimg)) {
            this.faces_imgs[idx][imgh].push(image.create(cimg.width, cimg.height));
            return;
        }
        let img = image.create(1, 1), scale = 0.2;
        while (img.width < cimg.width || img.height < cimg.height) {
            Polymesh.resizeImage(cimg.clone(), img, true);
            this.faces_imgs[idx][imgh].push(img.clone());
            const scaleD = scale;
            img = image.create(Math.max(1, Math.trunc(scaleD * cimg.width)), Math.max(1, Math.trunc(scaleD * cimg.height)));
            scale *= square * (scale * 7.95);
        } this.faces_imgs[idx][imgh].push(cimg.clone());
    }

    protected faces_imgs: {[imgh: string]: Image[]}[]; protected faces_imgs_cache_stack: Image[][];
    get vfaces(): Polymesh.FaceLOD[] {
        if (this.isDel()) return null
        return this.faces.map((v, i) => {
            if (v.img) return {
                    indices: v.indices, color: v.color,
                    offset: v.offset, scale: v.scale,
                    img: v.img, imgs: this.faces_imgs[i][Polymesh.hashImage(v.img)] ? this.faces_imgs[i][Polymesh.hashImage(v.img)] : [v.img]
                };
            return {
                indices: v.indices, color: v.color,
                offset: v.offset, scale: v.scale
            }
        })
    }

    pointCam<T>(f: (v: Polymesh.Vector3) => T|Polymesh.Vector3) {
        return this.points.map(v => {
            const vpoint = { x: this.pos.x + v.x, y: this.pos.y + v.y, z: this.pos.z + v.z };
            const vpivot = { x: this.pos.x + this.pivot.x, y: this.pos.y + this.pivot.y, z: this.pos.z + this.pivot.z };
            return f(Polymesh.rotatePoint3Dxyz(vpoint, vpivot, this.rot));
        })
    };

    __onLoop() {
        this.updImgLodCacheSlot();
        this.updImgLodCache();
    }

    init() {
        this.data = {};
        this.faces = [];
        this.points = [];
        this.pivot = { x: 0, y: 0, z: 0 };
        this.flag = { invisible: false, cull: false, lod: false, texStream: false };
        this.createFacesImgLODcache();
    }

    constructor(kind: number, idx: number) {
        super();
        this.kind = (kind | 0);
        this.idx = (idx | 0);
    }

    __onDel() {
        this.faces_imgs_cache_stack = null, this.faces_imgs = null, this.faces = null, this.points = null, this.pivot = null, this.flag = null, this.data = null;
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
        if (this.isDel()) return NaN
        return Polymesh.meshDistZ(this) * Polymesh.NORMAL_DIST
    }

    //% blockId=poly_dist_zdepth
    //% blockNamespace=Polymesh
    //% block=" $this as Z of depth"
    //% this.shadow=variables_get this.defl=myMesh
    //% group="Mesh util"
    //% weight=6
    zDepth() {
        if (this.isDel()) return NaN
        return Polymesh.meshDepthZ(this)
    }

    //% blockId=poly_dist_camera
    //% blockNamespace=Polymesh
    //% block=" $this get distance from camera"
    //% this.shadow=variables_get this.defl=myMesh
    //% group="Mesh util"
    //% weight=8
    distFromCamera() {
        if (this.isDel()) return NaN
        const distPos = { x: Polymesh.camview.pos.x - this.pos.x, y: Polymesh.camview.pos.y - this.pos.y, z: Polymesh.camview.pos.z - this.pos.z }
        const distSum = (distPos.x * distPos.x) + (distPos.y * distPos.y) + (distPos.z * distPos.z)
        return Math.sqrt(distSum)
    }

    //% blockId=poly_dist_othermesh
    //% blockNamespace=Polymesh
    //% block=" $this get distance from $otherMesh"
    //% this.shadow=variables_get this.defl=myMesh
    //% otherMesh.shadow=variables_get otherMesh.defl=otherMesh
    //% group="Mesh util"
    //% weight=9
    distBetween(otherMesh: polymesh) {
        if (otherMesh.isDel()) return NaN
        if (this.isDel()) return NaN
        const distPos = { x: otherMesh.pos.x - this.pos.x, y: otherMesh.pos.y - this.pos.y, z: otherMesh.pos.z - this.pos.z }
        const distSum = (distPos.x * distPos.x) + (distPos.y * distPos.y) + (distPos.z * distPos.z)
        return Math.sqrt(distSum)
    }

    //% blockId=poly_normal_speed
    //% blockNamespace=Polymesh
    //% block=" $this get normal speed"
    //% this.shadow=variables_get this.defl=myMesh
    //% group="Mesh util"
    //% weight=10
    normalSpeed() {
        if (this.isDel()) return NaN
        const distPosV = { vx: this.pos.vx, vy: this.pos.vy, vz: this.pos.vz }
        const distSum = (distPosV.vx * distPosV.vx) + (distPosV.vy * distPosV.vy) + (distPosV.vz * distPosV.vz)
        return Math.sqrt(distSum)
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
            case 0x1:          this.flag.cull   = ok; break;
            case 0x2:          this.flag.texStream = ok; break;
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
            case 0x2:          return this.flag.texStream;
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
        this.points[idx] = { x: point3.x, y: point3.y, z: point3.z }
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
        this.points.push({ x: point3.x, y: point3.y, z: point3.z })
    }

    //% blockId=poly_vertice_del
    //% blockNamespace=Polymesh
    //% block=" $this remove vertice|| at $idx"
    //% this.shadow=variables_get this.defl=myMesh
    //% group="Mesh remover"
    //% weight=10
    delVertice(idx?: number) {
        if (this.isDel()) return
        if (idx) this.points.removeAt(idx);
        else this.points.pop();
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
        if (img) this.faces[idx] = { indices: indice, color: c, offset: clface.oface, scale: billscale.scale, img: img.clone() };
        else this.faces[idx] = { indices: indice, color: c, offset: clface.oface, scale: billscale.scale, img: null }
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
        if (img) this.faces.push({ indices: indice, color: c, offset: clface.oface, scale: billscale.scale, img: img.clone() });
        else this.faces.push({ indices: indice, color: c, offset: clface.oface, scale: billscale.scale, img: null });
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
        if (idx) this.faces.removeAt(idx);
        else this.faces.pop();
    }

    //% blockId=poly_getfacecolor
    //% blockNamespace=Polymesh
    //% block=" $this get face color at $idx"
    //% this.shadow=variables_get this.defl=myMesh
    //% group="Mesh face property"
    //% weight=10
    getFaceColor(idx: number) {
        if (this.isDel()) return NaN
        if (!this.faces[idx].color) return NaN
        return this.faces[idx].color
    }

    //% blockId=poly_setfacecolor
    //% blockNamespace=Polymesh
    //% block=" $this set face color at $idx to $c=colorindexpicker"
    //% this.shadow=variables_get this.defl=myMesh
    //% group="Mesh face property"
    //% weight=9
    setFaceColor(idx: number, c: number) {
        if (this.isDel()) return
        if (this.faces[idx].color === c) return;
        this.faces[idx].color = c
    }

    //% blockId=poly_getfaceimage
    //% blockNamespace=Polymesh
    //% block=" $this get face image at $idx"
    //% this.shadow=variables_get this.defl=myMesh
    //% group="Mesh face property"
    //% weight=8
    getFaceImage(idx: number) {
        if (this.isDel()) return null
        if (!this.faces[idx].img) return null
        return this.faces[idx].img
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
        if (this.faces[idx].img && this.faces[idx].img.equals(img)) return;
        this.faces[idx].img = img
        if (imgs) {
            const imgh = Polymesh.hashImage(img);
            if (this.faces_imgs[idx][imgh]) return;
            else this.faces_imgs[idx] = {};
            this.faces_imgs[idx][imgh] = imgs.slice();
            if (this.faces_imgs[idx][imgh][this.faces_imgs[idx][imgh].length - 1]) this.faces_imgs[idx][imgh][this.faces_imgs[idx][imgh].length - 1] = img.clone();
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
        this.faces[idx].img = null
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
        if (!this.faces[idx].offset) return NaN
        return this.faces[idx].offset
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
        if (this.faces[idx].offset === oface) return;
        this.faces[idx].offset = oface;
    }

    //% blockId=poly_getfacescale
    //% blockNamespace=Polymesh
    //% block=" $this get face scale at $idx"
    //% this.shadow=variables_get this.defl=myMesh
    //% group="Mesh face property"
    //% weight=5
    getFaceScale(idx: number) {
        if (this.isDel()) return NaN
        if (!this.faces[idx].scale) return NaN;
        return this.faces[idx].scale;
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
        if (this.faces[idx].scale === scale) return;
        this.faces[idx].scale = scale;
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
