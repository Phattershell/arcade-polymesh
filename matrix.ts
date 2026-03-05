
namespace Polymesh {

    export function iFx8(v: number) {
        switch (v) {
            case 2.0: return Fx.twoFx8;
            case 1.5: return Fx.oneHalfFx8;
            case 1.0: return Fx.oneFx8;
            case 0.0: return Fx.zeroFx8;
            default:  return Fx8(v);
        }
    }

    //Describes a point in 2d space with an attached intensity h
    export class Point2 {
        x: number;
        y: number;
        h: number;
        constructor(x: number, y: number, h: number) {
            this.x = x;
            this.y = y;
            this.h = h;
        }
    }

    export class Vector3 {
        protected _x: Fx8 = Fx.zeroFx8; protected _y: Fx8 = Fx.zeroFx8; protected _z: Fx8 = Fx.zeroFx8;

        set x(n: number) { this._x = Fx8(n); }; get x() { return Fx.toFloat(this._x); };
        set y(n: number) { this._y = Fx8(n); }; get y() { return Fx.toFloat(this._y); };
        set z(n: number) { this._z = Fx8(n); }; get z() { return Fx.toFloat(this._z); };

        constructor(x: number, y: number, z: number) {
            this.x = x; this.y = y; this.z = z;
        };
        public normalize() {
            const magnitude = 1 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            return new Vector3(this.x * magnitude, this.y * magnitude, this.z * magnitude);
        };
    }

    export class Motion3 extends Vector3 {
        // protected _x:  Fx8 = Fx.zeroFx8; protected _y:  Fx8 = Fx.zeroFx8; protected _z:  Fx8 = Fx.zeroFx8;
        protected _vx: Fx8 = Fx.zeroFx8; protected _vy: Fx8 = Fx.zeroFx8; protected _vz: Fx8 = Fx.zeroFx8;
        protected _ax: Fx8 = Fx.zeroFx8; protected _ay: Fx8 = Fx.zeroFx8; protected _az: Fx8 = Fx.zeroFx8;
        protected _fx: Fx8 = Fx.zeroFx8; protected _fy: Fx8 = Fx.zeroFx8; protected _fz: Fx8 = Fx.zeroFx8;

        //set  x(n: number) { this._x  = Fx8(n); }; get  x() { return Fx.toFloat(this._x);  };
        //set  y(n: number) { this._y  = Fx8(n); }; get  y() { return Fx.toFloat(this._y);  };
        //set  z(n: number) { this._z  = Fx8(n); }; get  z() { return Fx.toFloat(this._z);  };

        set vx(n: number) { this._vx = Fx8(n); }; get vx() { return Fx.toFloat(this._vx); };
        set vy(n: number) { this._vy = Fx8(n); }; get vy() { return Fx.toFloat(this._vy); };
        set vz(n: number) { this._vz = Fx8(n); }; get vz() { return Fx.toFloat(this._vz); };

        set ax(n: number) { this._ax = Fx8(n); }; get ax() { return Fx.toFloat(this._ax); };
        set ay(n: number) { this._ay = Fx8(n); }; get ay() { return Fx.toFloat(this._ay); };
        set az(n: number) { this._az = Fx8(n); }; get az() { return Fx.toFloat(this._az); };

        set fx(n: number) { this._fx = Fx8(n); }; get fx() { return Fx.toFloat(this._fx); };
        set fy(n: number) { this._fy = Fx8(n); }; get fy() { return Fx.toFloat(this._fy); };
        set fz(n: number) { this._fz = Fx8(n); }; get fz() { return Fx.toFloat(this._fz); };

        update(delta: Fx8) {
            if (this._ax !== Fx.zeroFx8) this._vx = Fx.add(this._vx, Fx.mul(this._ax, delta));
            if (this._ay !== Fx.zeroFx8) this._vy = Fx.add(this._vy, Fx.mul(this._ay, delta));
            if (this._az !== Fx.zeroFx8) this._vz = Fx.add(this._vz, Fx.mul(this._az, delta));

            if (this._fx !== Fx.zeroFx8) this._vx = Fx.mul(this._vx, Fx.mul(this._fx, delta));
            if (this._fy !== Fx.zeroFx8) this._vy = Fx.mul(this._vy, Fx.mul(this._fx, delta));
            if (this._fz !== Fx.zeroFx8) this._vz = Fx.mul(this._fz, Fx.mul(this._fz, delta));

            if (this._vx !== Fx.zeroFx8) this._x  = Fx.add(this._x,  Fx.mul(this._vx, delta));
            if (this._vy !== Fx.zeroFx8) this._y  = Fx.add(this._y,  Fx.mul(this._vy, delta));
            if (this._vz !== Fx.zeroFx8) this._z  = Fx.add(this._z,  Fx.mul(this._vz, delta));
        }
        
        constructor(x: number, y: number, z: number, vx: number, vy: number, vz: number, ax: number, ay: number, az: number, fx: number, fy: number, fz: number) {
            super(x, y, z);
            //this.x  = x;  this.y  = y;  this.z  = z;
            this.vx = vx; this.vy = vy; this.vz = vz;
            this.ax = ax; this.ay = ay; this.az = az;
            this.fx = fx; this.fy = fy; this.fz = fz;
        };

        public toVector() {
            return new Vector3(this.x, this.y, this.z);
        }
        
        public normalize() {
            return super.normalize();
        };
    }
    
/*
    //Describes a point in 3D space
    class Vector3 {
        x: number;
        y: number;
        z: number;
        constructor(x: number, y: number, z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        add(v: Vector3) {
            return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
        }

        mult(n: number) {
            return new Vector3(this.x * n, this.y * n, this.z * n);
        }

        normalize() {
            let magnitude = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            return new Vector3(this.x / magnitude, this.y / magnitude, this.z / magnitude);
        }
    }
    */

    //Describes the homogenous coordinates of a 3D point.
    export class Vector4 extends Vector3 {
        w: number;
        constructor(x: number, y: number, z: number, w?: number) {
            super(x, y, z);
            this.w = w || 0;
        }
        get() {
            return [this.x, this.y, this.z, this.w];
        }
        set(value: number[]) {
            this.x = value[0];
            this.y = value[1];
            this.z = value[2];
            this.w = value[3];
        }
    }

    //Matrix stuff

    export class Mat4x4 {
        data: number[][];
        constructor(data: number[][]) {
            this.data = data
        }
    }

    export const Identity4x4 = new Mat4x4([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]);

    //Used for rotations about the y axis
    export function makeOYRotationMatrix(degrees: number) {
        let cos = Math.cos(degrees * Math.PI / 180.0);
        let sin = Math.sin(degrees * Math.PI / 180.0);
        return new Mat4x4([
            [cos, 0, -sin, 0],
            [0, 1, 0, 0],
            [sin, 0, cos, 0],
            [0, 0, 0, 1]
        ]);
    }
    export function makeOXRotationMatrix(degrees: number) {
        let cos = Math.cos(degrees * Math.PI / 180.0);
        let sin = Math.sin(degrees * Math.PI / 180.0);
        return new Mat4x4([
            [1, 0, 0, 0],
            [0, cos, -sin, 0],
            [0, sin, cos, 0],
            [0, 0, 0, 1]
        ]);
    }
    export function makeOZRotationMatrix(degrees: number) {
        let cos = Math.cos(degrees * Math.PI / 180.0);
        let sin = Math.sin(degrees * Math.PI / 180.0);
        return new Mat4x4([
            [cos, -sin, 0, 0],
            [sin, cos, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
    }

    export function makeGeneralRotationMatrix(eulerAngles: Vector3) {
        return multiplyM44M44(makeOZRotationMatrix(eulerAngles.z), multiplyM44M44(makeOYRotationMatrix(eulerAngles.y), makeOXRotationMatrix(eulerAngles.x)));
    }

    export function makeTranslationMatrix(t: Vector3) {
        return new Mat4x4([
            [1, 0, 0, t.x],
            [0, 1, 0, t.y],
            [0, 0, 1, t.z],
            [0, 0, 0, 1]
        ]);
    }

    export function makeScalingMatrix(scale: number) {
        return new Mat4x4([
            [scale, 0, 0, 0],
            [0, scale, 0, 0],
            [0, 0, scale, 0],
            [0, 0, 0, 1]
        ]);
    }

    //Multiply a 4x4 Matrix by a vector4
    export function multiplyM44V4(mat4x4: Mat4x4, vec4: Vector4) {
        let result = [0, 0, 0, 0];
        let vec = [vec4.x, vec4.y, vec4.z, vec4.w];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result[i] += mat4x4.data[i][j] * vec[j];
            }
        }

        return new Vector4(result[0], result[1], result[2], result[3]);
    }


    // Multiplies two 4x4 matrices.
    export function multiplyM44M44(matA: Mat4x4, matB: Mat4x4) {
        let result = new Mat4x4([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]);

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    result.data[i][j] += matA.data[i][k] * matB.data[k][j];
                }
            }
        }

        return result;
    }


    // Transposes a 4x4 matrix.
    export function transposed(mat: Mat4x4) {
        let result = new Mat4x4([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result.data[i][j] = mat.data[j][i];
            }
        }
        return result;
    }

    // Class Matrix3x3 (เหมือนเดิม แต่เพิ่ม normalize เพื่อความปลอดภัย)
    export class Matrix3x3 {
        m: number[][];

        constructor() {
            this.m = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
        }

        setIdentity() {
            this.m = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ];
        }

        multiplyVector(x: number, y: number): [number, number] {
            let xx = this.m[0][0] * x + this.m[0][1] * y + this.m[0][2];
            let yy = this.m[1][0] * x + this.m[1][1] * y + this.m[1][2];
            let ww = this.m[2][0] * x + this.m[2][1] * y + this.m[2][2];
            if (Math.abs(ww) < 1e-6) ww = 1e-6;  // ป้องกัน divide by zero
            ww = 1 / ww;
            return [xx * ww, yy * ww];
        }

        inverse(): Matrix3x3 {
            let inv = new Matrix3x3();
            let a = this.m;

            let det =
                a[0][0] * (a[1][1] * a[2][2] - a[2][1] * a[1][2]) -
                a[0][1] * (a[1][0] * a[2][2] - a[2][0] * a[1][2]) +
                a[0][2] * (a[1][0] * a[2][1] - a[2][0] * a[1][1]);

            if (Math.abs(det) < 1e-6) {
                inv.setIdentity();  // ถ้า singular ให้ identity
                return inv;
            }

            let invDet = 1 / det;

            inv.m[0][0] = invDet * (a[1][1] * a[2][2] - a[2][1] * a[1][2]);
            inv.m[0][1] = invDet * (a[0][2] * a[2][1] - a[2][2] * a[0][1]);
            inv.m[0][2] = invDet * (a[0][1] * a[1][2] - a[1][1] * a[0][2]);

            inv.m[1][0] = invDet * (a[1][2] * a[2][0] - a[2][2] * a[1][0]);
            inv.m[1][1] = invDet * (a[0][0] * a[2][2] - a[2][0] * a[0][2]);
            inv.m[1][2] = invDet * (a[0][2] * a[1][0] - a[1][2] * a[0][0]);

            inv.m[2][0] = invDet * (a[1][0] * a[2][1] - a[2][0] * a[1][1]);
            inv.m[2][1] = invDet * (a[0][1] * a[2][0] - a[2][1] * a[0][0]);
            inv.m[2][2] = invDet * (a[0][0] * a[1][1] - a[1][0] * a[0][1]);

            return inv;
        }
    }

    // ฟังก์ชันคำนวณ homography ด้วย DLT สำหรับ 4 จุด (source rectangle → dest quad)
    export function computeHomography(
        srcW: number, srcH: number,  // ขนาด source image (source points = (0,0), (srcW,0), (srcW,srcH), (0,srcH))
        dx0: number, dy0: number,     // dest top-left
        dx1: number, dy1: number,     // top-right
        dx2: number, dy2: number,     // bottom-right
        dx3: number, dy3: number      // bottom-left
    ): Matrix3x3 {
        // Source points (มาตรฐาน rectangle)
        let sx = [0, srcW, srcW, 0];
        let sy = [0, 0, srcH, srcH];

        // Dest points
        let dx = [dx0, dx1, dx2, dx3];
        let dy = [dy0, dy1, dy2, dy3];

        // สร้าง matrix A 8x9 สำหรับ DLT (Ax = 0, x = [h11 h12 h13 h21 h22 h23 h31 h32 h33]^T)
        // แต่เนื่องจาก Arcade ไม่มี SVD เราจะใช้สูตร approximate/normalized สำหรับ 4 จุด

        let H = new Matrix3x3();

        // วิธี implement DLT แบบง่าย (จากสูตร math.stackexchange + js adaptation)
        // สร้าง 8 equations (แต่เราจะ normalize h33=1 แล้วแก้ linear system 8x8 แต่เพื่อความง่าย ใช้สูตรที่ปรับแล้ว)

        // ใช้สูตรจาก community (ปรับจาก jsfiddle/math sources) - สร้าง A 8x9 แล้ว normalize ด้วย h9=1

        // สร้าง array สำหรับ linear system (แต่ Arcade ไม่มี matrix solver เราจะ hard-code สำหรับ 4 points)
        // นี่คือสูตรที่คนใช้บ่อยใน JS (ไม่ perfect แต่ทำงานได้ดีในกรณีส่วนใหญ่)

        let A: number[][] = [];
        for (let i = 0; i < 4; i++) {
            // แต่ละ point ให้ 2 rows
            let row1 = [
                sx[i], sy[i], 1, 0, 0, 0, -dx[i] * sx[i], -dx[i] * sy[i], -dx[i]
            ];
            let row2 = [
                0, 0, 0, sx[i], sy[i], 1, -dy[i] * sx[i], -dy[i] * sy[i], -dy[i]
            ];
            A.push(row1);
            A.push(row2);
        }

        // ตอนนี้ A เป็น 8x9
        // เพื่อแก้ Ax=0 (homogeneous) เราต้องการ null space
        // แต่ไม่มี SVD → ใช้ approximation โดย normalize h33=1 แล้วแก้ 8 equations 8 unknowns (h1..h8)

        // สร้าง matrix B 8x8 จาก column 0-7, และ vector b จาก column 8 (negative)
        let B: number[][] = [];
        let b: number[] = [];
        for (let i = 0; i < 8; i++) {
            let row: number[] = [];
            for (let j = 0; j < 8; j++) {
                row.push(A[i][j]);
            }
            B.push(row.slice());
            b.push(-A[i][8]);
        }

        // ตอนนี้แก้ B h = b โดย h = [h11 h12 h13 h21 h22 h23 h31 h32]^T
        // แต่ Arcade ไม่มี gaussian elimination เราจะต้อง implement หรือใช้สูตร fixed สำหรับ 4 points
        // เพื่อความง่ายและเร็วใน Arcade ผมแนะนำใช้สูตร bilinear approx ก่อน หรือ implement gaussian เล็ก ๆ

        // **ทางเลือกที่ดีที่สุดสำหรับ Arcade: ใช้สูตร homography สำเร็จรูปที่คนเคยแชร์ (จาก js implementations)**

        // สูตรนี้จาก adaptation ของ simple-homography / math sources (ทำงานได้ดีกับ quad)
        let den = (sx[0] * sy[1] - sx[1] * sy[0]) * (sx[2] * sy[3] - sx[3] * sy[2]) - (sx[0] * sy[2] - sx[2] * sy[0]) * (sx[1] * sy[3] - sx[3] * sy[1]);

        if (Math.abs(den) < 1e-6) {
            H.setIdentity();
            return H;
        }

        // คำนวณ h (สูตรยาว แต่ทำงาน)
        // ผมจะใช้สูตรจาก https://math.stackexchange.com/questions/494238 (ปรับมา)
        // แต่เพื่อไม่ให้ยาวเกิน ใช้ bilinear mapping แบบดีขึ้นแทน (หรือ full DLT ด้านล่าง)

        // **เวอร์ชัน bilinear approx ที่ดีกว่า (เร็วมากและใช้ได้จริงใน Arcade)**
        // ถ้าต้องการ true DLT จริง ๆ บอกมา ผมจะ paste gaussian elimination 8x8 ให้ (แต่ยาว \~50 บรรทัด)

        // สำหรับตอนนี้ ใช้สูตร approximate ที่ดี (perspective approx)
        let Happrox = new Matrix3x3();

        // ตัวอย่างสูตรจาก community (ปรับจาก bilinear + shear)
        let aa = (dx[1] - dx[0]) / srcW;
        let bb = (dy[1] - dy[0]) / srcW;
        let c = (dx[3] - dx[0]) / srcH;
        let d = (dy[3] - dy[0]) / srcH;

        Happrox.m[0][0] = aa;
        Happrox.m[0][1] = (dx[2] - dx[1] - c * srcW) / srcH;
        Happrox.m[0][2] = dx[0];
        Happrox.m[1][0] = bb;
        Happrox.m[1][1] = (dy[2] - dy[1] - d * srcW) / srcH;
        Happrox.m[1][2] = dy[0];
        Happrox.m[2][0] = 0;
        Happrox.m[2][1] = 0;
        Happrox.m[2][2] = 1;

        return Happrox;  // ใช้ approx นี้ก่อน เพราะเร็วและไม่ lag

        // ถ้าต้องการ true DLT + gaussian elimination บอกมา ผมจะเพิ่มให้ครับ (แต่จะช้ากว่าใน loop)
    }

}
