
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

    export class Motion3 {
        _x:  Fx8 = Fx.zeroFx8; _y:  Fx8 = Fx.zeroFx8; _z:  Fx8 = Fx.zeroFx8;
        _vx: Fx8 = Fx.zeroFx8; _vy: Fx8 = Fx.zeroFx8; _vz: Fx8 = Fx.zeroFx8;
        _ax: Fx8 = Fx.zeroFx8; _ay: Fx8 = Fx.zeroFx8; _az: Fx8 = Fx.zeroFx8;
        _fx: Fx8 = Fx.zeroFx8; _fy: Fx8 = Fx.zeroFx8; _fz: Fx8 = Fx.zeroFx8;

        set  x(n: number) { this._x  = Fx8(n); }; get  x() { return Fx.toFloat(this._x);  };
        set  y(n: number) { this._y  = Fx8(n); }; get  y() { return Fx.toFloat(this._y);  };
        set  z(n: number) { this._z  = Fx8(n); }; get  z() { return Fx.toFloat(this._z);  };

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
            this.x  = x;  this.y  = y;  this.z  = z;
            this.vx = vx; this.vy = vy; this.vz = vz;
            this.ax = ax; this.ay = ay; this.az = az;
            this.fx = fx; this.fy = fy; this.fz = fz;
        };

        public toVector() {
            return new Vector3(this.x, this.y, this.z);
        }
        
        public normalize() {
            const magnitude = 1 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            return new Vector3(this.x * magnitude, this.y * magnitude, this.z * magnitude);
        };
    }
    
    export class Vector3 {
        private _x: Fx8 = Fx.zeroFx8; private _y: Fx8 = Fx.zeroFx8; private _z: Fx8 = Fx.zeroFx8;

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
    function makeOYRotationMatrix(degrees: number) {
        let cos = Math.cos(degrees * Math.PI / 180.0);
        let sin = Math.sin(degrees * Math.PI / 180.0);
        return new Mat4x4([
            [cos, 0, -sin, 0],
            [0, 1, 0, 0],
            [sin, 0, cos, 0],
            [0, 0, 0, 1]
        ]);
    }
    function makeOXRotationMatrix(degrees: number) {
        let cos = Math.cos(degrees * Math.PI / 180.0);
        let sin = Math.sin(degrees * Math.PI / 180.0);
        return new Mat4x4([
            [1, 0, 0, 0],
            [0, cos, -sin, 0],
            [0, sin, cos, 0],
            [0, 0, 0, 1]
        ]);
    }
    function makeOZRotationMatrix(degrees: number) {
        let cos = Math.cos(degrees * Math.PI / 180.0);
        let sin = Math.sin(degrees * Math.PI / 180.0);
        return new Mat4x4([
            [cos, -sin, 0, 0],
            [sin, cos, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
    }

    function makeGeneralRotationMatrix(eulerAngles: Vector3) {
        return multiplyM44M44(makeOZRotationMatrix(eulerAngles.z), multiplyM44M44(makeOYRotationMatrix(eulerAngles.y), makeOXRotationMatrix(eulerAngles.x)));
    }

    function makeTranslationMatrix(t: Vector3) {
        return new Mat4x4([
            [1, 0, 0, t.x],
            [0, 1, 0, t.y],
            [0, 0, 1, t.z],
            [0, 0, 0, 1]
        ]);
    }

    function makeScalingMatrix(scale: number) {
        return new Mat4x4([
            [scale, 0, 0, 0],
            [0, scale, 0, 0],
            [0, 0, scale, 0],
            [0, 0, 0, 1]
        ]);
    }

    //Multiply a 4x4 Matrix by a vector4
    function multiplyM44V4(mat4x4: Mat4x4, vec4: Vector4) {
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
    function multiplyM44M44(matA: Mat4x4, matB: Mat4x4) {
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
    function transposed(mat: Mat4x4) {
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

}
