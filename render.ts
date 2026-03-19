
namespace Polymesh {

    class modelDepth { constructor(public mesh: model, public depth: number) { } }
    
    export class view extends base {

        points: Vector3[]; zoom: number; near: number; far: number; tpoints: Vector3[]; private viewport: Image;

        setViewport(viewport: Image) {
            if (this.viewport.width === viewport.width &&
                this.viewport.height === viewport.height) return;
            this.viewport.fill(0);
            this.viewport = viewport;
        }

        getViewport() {
            return this.viewport;
        }

        initView() {
            this.points = [
                new Vector3(0, 0, 1/*, Math.idiv(this.near, 50)*/),
                new Vector3(Math.SQRT1_2, 0, Math.SQRT1_2),
                new Vector3(-Math.SQRT1_2, 0, Math.SQRT1_2),
                new Vector3(0, Math.SQRT1_2, Math.SQRT1_2),
                new Vector3(0, -Math.SQRT1_2, Math.SQRT1_2),
            ];
        }

        pointUpdate() {
            for (let i = 0; i < this.points.length; i++) this.tpoints[i] = rotatePoint3Dxyz(this.points[i], this.pos.toVector(), this.rot.toVector());
        }

        __onDel() {
            this.points = [];
            this.tpoints = [];
            this.viewport = null;
            this.zoom = null;
            this.near = null;
            this.far = null;
        }

        __onLoop() {
            //pause(100);
            this.viewport.fill(0);
            this.pointUpdate();
            this.renderMshs(meshAny(), this.viewport);
        }

        renderMshs(mshs: model[], output: Image, lineren?: boolean) {
            if (this.isDel()) return;
            const sorted = mshs.map(msh => new modelDepth(msh, msh.zDepth()))
            if (sorted.length <= 0) return;
            switch (sort) {
                case 0x0: sorted.sort((a, b) => b.depth - a.depth); break;
                case 0x1: quickSort(sorted, (a, b) => b.depth - a.depth); break;
                case 0x2:
                default: duoQuickSort(sorted, (a, b) => b.depth - a.depth); break;
            }
            for (const m of sorted) {
                if (m.mesh.flag.invisible) continue;
                this.render(m.mesh, output, lineren);
            }
        }

        constructor(undel?: boolean, viewport?: Image) {
            super(undel);
            if (viewport === undefined) viewport = scene.backgroundImage();
            this.viewport = viewport;
            this.zoom = 1;
            this.near = 150;
            this.far = 0;
            this.initView();
            this.tpoints = []
        }

        setPos(choice: number, x: number) {
            switch (choice) {
                case 0xC: if (this.zoom !== x) this.zoom = x; return
                case 0xD: if (this.near !== x) this.near = x; this.initView(); return
                case 0xE: if (this.far !== x) this.far = x; return
            }; super.setPos(choice, x);
        }

        changePos(choice: number, x: number) {
            switch (choice) {
                case 0xC: if (this.zoom !== this.zoom + x) this.zoom += x; return
                case 0xD: if (this.near !== this.near + x) this.near += x; this.initView(); return
                case 0xE: if (this.far !== this.far + x) this.far += x; return
            }; super.changePos(choice, x);
        }

        getPos(choice: number) {
            switch (choice) {
                case 0xC: return this.zoom
                case 0xD: return this.near
                case 0xE: return this.far
            }; return super.getPos(choice);
        }

        render(msh: model, output: Image, lineren?: boolean) {
            if (this.isDel()) return;
            if (msh.isDel()) return;
            if (!msh || !output || msh.points.length <= 0 || msh.faces.length <= 0) return;
            if (msh.flag.invisible) return;

            const dist = this.near, fardist = (this.far === 0 ? 0x7f : this.far), zoom = this.zoom;

            const centerX = output.width >>> 1, centerY = output.height >>> 1;

            let tmp = 0
            const cosX = fcos(camview.rot.x), sinX = fsin(camview.rot.x);
            const cosY = fcos(camview.rot.y), sinY = fsin(camview.rot.y);
            const cosZ = fcos(camview.rot.z), sinZ = fsin(camview.rot.z);

            // Transform vertices
            const rotated = msh.pointCam((v) => {
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
                const scale = Math.abs(dist) * finv(Math.abs(dist) + z);
                return new Vector3(
                    centerX + (x * scale * zoom),
                    centerY - (y * scale * zoom),
                    z
                );
            });

            // Sort triangles
            const trisCMP = (a: Polymesh.FaceLOD, b: Polymesh.FaceLOD) => avgZ(rotated, b.indices) - avgZ(rotated, a.indices)
            const tris = msh.vfaces.slice();
            //control.runInParallel(() => {
            switch (sort) {
                case 0x0: tris.sort((a, b) => trisCMP(a, b)); break;
                case 0x1: quickSort(tris, (a, b) => trisCMP(a, b)); break;
                case 0x2:
                default: duoQuickSort(tris, (a, b) => trisCMP(a, b)); break;
            }
            //})

            //pause(0);

            // Render
            for (let i = 0; i < tris.length; i++) {
                const t = tris[i]
                const inds = t.indices;
                if (inds.some(i => (rotated[i].z < -Math.abs(dist) || (fardist > 0 && rotated[i].z > Math.abs(fardist))))) continue;
                //const inds_ = [];
                //if (inds.length > 2) inds_[0] = [t.indices[0], t.indices[1], t.indices[2]];
                //if (inds.length > 3) inds_[1] = [t.indices[3], t.indices[1], t.indices[2]];
                const scale = (Math.abs(dist) * finv(Math.abs(dist) + avgZ(rotated, t.indices)));
                // LOD calculating?
                let im: Image = null
                if (t.img) {
                    im = t.img;
                    if (msh.flag.texStream) {
                        let scaleD = finv(scale * zoom) * 0.2;
                        scaleD = Math.clamp(0, t.imgs.length - 1, Math.round((1.25 - scaleD) * (t.imgs.length - 1)));
                        im = t.imgs[scaleD]
                        if (im == null) im = image.create(1, 1)
                    }
                }
                if (t.indices.length === 1) {
                    const idx = t.indices[0];
                    const pt = rotated[idx];

                    // center image
                    const bq = new pt2_4(
                        pt.x, pt.y,
                        pt.x, pt.y,
                        pt.x, pt.y,
                        pt.x, pt.y,
                    )

                    const square = dist + (2048 * (scale * t.scale) * zoom)
                    if (im) {
                        // set scale image from camera distance
                        const halfW = (im.width * 0.33333333) * scale * t.scale * zoom;
                        const halfH = (im.height * 0.33333333) * scale * t.scale * zoom;

                        bq.x0 += halfW, bq.y0 += halfH
                        bq.x1 -= halfW, bq.y1 += halfH
                        bq.x2 += halfW, bq.y2 -= halfH
                        bq.x3 -= halfW, bq.y3 -= halfH
                        if (bq.toArr.every(v => (isOutOfArea(v.x, v.y, output.width, output.height)))) continue;
                    } else {
                        bq.x0 += square, bq.y0 += square
                        bq.x1 -= square, bq.y1 += square
                        bq.x2 += square, bq.y2 -= square
                        bq.x3 -= square, bq.y3 -= square
                        if (bq.toArr.every(v => (isOutOfArea(v.x, v.y, output.width, output.height)))) continue;
                    }
                } else if (isOutOfAreaOnFace(rotated, inds, output.width, output.height)) if (inds.every(i => isOutOfArea(rotated[i].x, rotated[i].y, output.width, output.height))) continue;

                const culling = msh.flag.cull

                // Backface culling
                //if (culling)
                //    if ((inds_[0] && !shouldRenderFace(rotated, inds_[0], camview.pos, t.offset)) &&
                //        (inds_[1] && !shouldRenderFace(rotated, inds_[1], camview.pos, t.offset))) continue;

                if (culling) if (shouldCull(avgXYZ(rotated, inds), t.offset)) continue;

                const idx = t.indices[0];
                const pt = rotated[idx];
                // center image

                let square = dist + (2048 * (scale * t.scale) * zoom)

                let halfW = square + dist;
                let halfH = square + dist;

                if (t.img) {
                    // set scale image from camera distance

                    halfW = (im.width * 0.33333333) * scale * t.scale * zoom;
                    halfH = (im.height * 0.33333333) * scale * t.scale * zoom;

                    square = Polymesh.gcd(halfW, halfH)
                };
                // when have 2D image billboard (indices.length == 1 and img)
                if (t.indices.length === 1) {
                    if (pt.z < -Math.abs(dist)) continue;

                    // when no image
                    if (!t.img) { fillCircleImage(output, pt.x, pt.y, square, t.color); continue; }

                    // fill circle if image is empty
                    if (isEmptyImage(t.img)) { fillCircleImage(output, pt.x, pt.y, square, t.color); continue; }

                    halfW *= 0.75;
                    halfH *= 0.75;

                    // Draw Simple 2D image (billboard) as quad pixel on image
                    // use distortImage or drawing without perspective distortion
                    // I will use distortImage draw as vertex quad
                    distortImage(im, output,
                        pt.x + halfW, pt.y - halfH,
                        pt.x - halfW, pt.y - halfH,
                        pt.x - halfW, pt.y + halfH,
                        pt.x + halfW, pt.y + halfH
                    );
                    continue;
                }

                if (inds.length < 2) continue;
                // Draw line canvas when have line color index
                if (lineren) {
                    picDrawLine(output, rotated[inds[0]].x, rotated[inds[0]].y, rotated[inds[1]].x, rotated[inds[1]].y, t.color);
                    if (inds.length < 3) continue;
                    picDrawLine(output, rotated[inds[0]].x, rotated[inds[0]].y, rotated[inds[2]].x, rotated[inds[2]].y, t.color);
                    if (inds.length > 3) picDrawLine(output, rotated[inds[3]].x, rotated[inds[3]].y, rotated[inds[1]].x, rotated[inds[1]].y, t.color), picDrawLine(output, rotated[inds[3]].x, rotated[inds[3]].y, rotated[inds[2]].x, rotated[inds[2]].y, t.color);
                    else picDrawLine(output, rotated[inds[1]].x, rotated[inds[1]].y, rotated[inds[2]].x, rotated[inds[2]].y, t.color);
                    continue;
                }
                if (t.color > 0) {
                    // Draw line when no shape
                    if (inds.length < 3) {
                        picDrawLine(output,
                            rotated[inds[0]].x, rotated[inds[0]].y,
                            rotated[inds[1]].x, rotated[inds[1]].y,
                            t.color
                        );
                    }
                    if (inds.length > 2) {
                        // Draw solid when is vertice shape
                        helpers.imageFillTriangle(output,
                            rotated[inds[0]].x, rotated[inds[0]].y,
                            rotated[inds[1]].x, rotated[inds[1]].y,
                            rotated[inds[2]].x, rotated[inds[2]].y,
                            t.color
                        );
                        if (inds.length > 3) {
                            helpers.imageFillTriangle(output,
                                rotated[inds[3]].x, rotated[inds[3]].y,
                                rotated[inds[1]].x, rotated[inds[1]].y,
                                rotated[inds[2]].x, rotated[inds[2]].y,
                                t.color
                            );
                        }
                    }
                }

                if ((t.img && isEmptyImage(t.img)) || !t.img) continue;

                // Draw texture over
                if (inds.length > 2) {
                    distortImage(im, output,
                        rotated[inds[3]].x, rotated[inds[3]].y,
                        rotated[inds[2]].x, rotated[inds[2]].y,
                        rotated[inds[0]].x, rotated[inds[0]].y,
                        rotated[inds[1]].x, rotated[inds[1]].y
                    );
                } else if (inds.length > 3) {
                    distortImage(im, output,
                        rotated[inds[3]].x, rotated[inds[3]].y,
                        rotated[inds[2]].x, rotated[inds[2]].y,
                        rotated[inds[0]].x, rotated[inds[0]].y,
                        rotated[inds[1]].x, rotated[inds[1]].y
                    );
                }

            }

        }
    }

}