
namespace Polymesh {

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
        public x:  number; public y:  number; public z:  number;
        public vx: number; public vy: number; public vz: number;
        public ax: number; public ay: number; public az: number;
        public fx: number; public fy: number; public fz: number;
        
        constructor(x: number, y: number, z: number, vx: number, vy: number, vz: number, ax: number, ay: number, az: number, fx: number, fy: number, fz: number) {
            this.x  = x;  this.y  = y;  this.z  = z;
            this.vx = vx; this.vy = vy; this.vz = vz;
            this.ax = ax; this.ay = ay; this.az = az;
            this.fx = fx; this.fy = fy; this.fz = fz;
        };
        
        public normalize() {
            const magnitude = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            return new Vector3(this.x / magnitude, this.y / magnitude, this.z / magnitude);
        };
    }
    
    export class Vector3 {
        public x: number; public y: number; public z: number;
        constructor(x: number, y: number, z: number) {
            this.x = x; this.y = y; this.z = z;
        };
        public normalize() {
            const magnitude = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            return new Vector3(this.x / magnitude, this.y / magnitude, this.z / magnitude);
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
