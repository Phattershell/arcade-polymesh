// tests go here; this will not be compiled when this package is used as an extension.

game.stats = true;
control.EventContext.onStats("");

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    SolidOnly = !SolidOnly
    for (const msh of Polymesh.meshAll(PolyKind.obj)) {
        msh.setFaceImage(0, img`.`)
        if (!SolidOnly) continue;
        if ((Polymesh.meshAll(PolyKind.obj).indexOf(msh) & 1) === 0) msh.setFaceImage(0, img`
            . . 1 1 . . . . . 1 . . . . . 1 . . . . . 1 1 . .
        `)
        else msh.setFaceImage(0, img`
            . . 1 1 . . . . . . . . . . . . . . . . . 1 1 . .
        `)
    }
})
function setupMesh() {
    cubeSize = 20
    for (let index = 0; index <= maxMesh; index++) {
        myMesh = Polymesh.create(PolyKind.obj)
        myMesh.setFlag(MeshFlags.cull, false)
        myMesh.setFlag(MeshFlags.texStream, true)
        myMesh.addVertice(Polymesh.point3Shadow(0 + 2 * cubeSize, 1.5 * cubeSize, 0 + cubeSize))
        myMesh.addVertice(Polymesh.point3Shadow(0 - 2 * cubeSize, 1.5 * cubeSize, 0 + cubeSize))
        myMesh.addVertice(Polymesh.point3Shadow(0 + 2 * cubeSize, 1.5 * cubeSize, 0 - cubeSize))
        myMesh.addVertice(Polymesh.point3Shadow(0 - 2 * cubeSize, 1.5 * cubeSize, 0 - cubeSize))
        myMesh.addFace(
            0,
            Polymesh.indiceShadow(
                0,
                1,
                2,
                3
            ),
            Polymesh.offsetFaceShadow(0),
            Polymesh.billSizeShadow(1),
            img`.`
        )
        myMesh.addVertice(Polymesh.point3Shadow(0 + 20 * cubeSize, 1.5 * cubeSize, 0 + cubeSize))
        myMesh.addVertice(Polymesh.point3Shadow(0 - 20 * cubeSize, 1.5 * cubeSize, 0 + cubeSize))
        myMesh.addVertice(Polymesh.point3Shadow(0 + 20 * cubeSize, 1.5 * cubeSize, 0 - cubeSize))
        myMesh.addVertice(Polymesh.point3Shadow(0 - 20 * cubeSize, 1.5 * cubeSize, 0 - cubeSize))
        myMesh.addFace(
            0,
            Polymesh.indiceShadow(
                0,
                2,
                4,
                6
            ),
            Polymesh.offsetFaceShadow(0),
            Polymesh.billSizeShadow(1),
            img`.`
        )
        myMesh.addFace(
            0,
            Polymesh.indiceShadow(
                1,
                3,
                5,
                7
            ),
            Polymesh.offsetFaceShadow(0),
            Polymesh.billSizeShadow(1),
            img`.`
        )
        if (SolidOnly) {
            if (index % 2 < 1) {
                myMesh.setFaceImage(0, img`
                    . . 1 1 . . . . . 1 . . . . . 1 . . . . . 1 1 . .
                `)
            } else {
                myMesh.setFaceImage(0, img`
                    . . 1 1 . . . . . . . . . . . . . . . . . 1 1 . .
                `)
            }
            myMesh.getFaceImage(0).replace(1, scene.backgroundColor())
        }
        myMesh.setPos(PolyPos.z, index * (cubeSize * 2))
    }
}
let cubeSize = 0
let myMesh: Polymesh.model = null
let SolidOnly = true
let maxMesh = 0
scene.setBackgroundColor(9)
let moveSpeed = 150
let jumpPower = 16
maxMesh = 11
//SolidOnly = false
Polymesh.setCam(PolyCam.dist, 55)
Polymesh.setCam(PolyCam.fardist, 350)
Polymesh.changeCam(PolyCam.zoom, 1)
Polymesh.sortingMethod(PolySort.quick)

setupMesh()
game.onUpdate(function () {
    for (let value2 of Polymesh.meshAll(PolyKind.obj)) {
        value2.setPos(PolyPos.az, controller.dy() * (moveSpeed / 2))
        if (value2.getPos(PolyPos.z) < 0 - cubeSize * 3) {
            value2.changePos(PolyPos.z, (maxMesh - 1) * (cubeSize * 2))
        }
        if (value2.getPos(PolyPos.z) > (maxMesh - 2) * (cubeSize * 2)) {
            value2.changePos(PolyPos.z, 0 - (maxMesh - 1) * (cubeSize * 2))
        }
        value2.setPos(PolyPos.vz, Math.min(Math.max(value2.getPos(PolyPos.vz), 0 - moveSpeed * 4), moveSpeed * 4))
        if (value2.getPos(PolyPos.z) < (maxMesh - 8.5) * (cubeSize * 2)) {
            value2.getFaceImage(0).replace(9, 1)
            value2.getFaceImage(0).replace(7, 1)
            value2.getFaceImage(0).replace(scene.backgroundColor(), 1)
            if (Polymesh.meshAll(PolyKind.obj).indexOf(value2) % 2 > 0) {
                value2.setFaceColor(0, 7)
                value2.setFaceColor(1, 9)
                value2.setFaceColor(2, 9)
            } else {
                value2.setFaceColor(0, 9)
                value2.setFaceColor(1, 7)
                value2.setFaceColor(2, 7)
            }
        } else if (value2.getPos(PolyPos.z) < (maxMesh - 5.5) * (cubeSize * 2)) {
            value2.getFaceImage(0).replace(1, 9)
            value2.getFaceImage(0).replace(7, 9)
            value2.getFaceImage(0).replace(scene.backgroundColor(), 9)
            if (Polymesh.meshAll(PolyKind.obj).indexOf(value2) % 2 > 0) {
                value2.setFaceColor(0, 7)
                value2.setFaceColor(1, 6)
                value2.setFaceColor(2, 6)
            } else {
                value2.setFaceColor(0, 6)
                value2.setFaceColor(1, 7)
                value2.setFaceColor(2, 7)
            }
        } else {
            value2.getFaceImage(0).replace(1, 7)
            value2.getFaceImage(0).replace(9, 7)
            value2.getFaceImage(0).replace(scene.backgroundColor(), 7)
            if (Polymesh.meshAll(PolyKind.obj).indexOf(value2) % 2 > 0) {
                value2.setFaceColor(0, 8)
                value2.setFaceColor(1, 6)
                value2.setFaceColor(2, 6)
            } else {
                value2.setFaceColor(0, 6)
                value2.setFaceColor(1, 8)
                value2.setFaceColor(2, 8)
            }
        }
        myMesh = value2
        const hash = Polymesh.hashImage(value2.getFaceImage(0))
    }
})
game.onUpdate(function () {
    Polymesh.setCam(PolyCam.ay, 500)
    if (Polymesh.getCam(PolyCam.y) >= 0) {
        Polymesh.setCam(PolyCam.vy, 0)
    }
    if (controller.A.isPressed() && Polymesh.getCam(PolyCam.y) >= 0) {
        Polymesh.setCam(PolyCam.vy, -250)
    }
    Polymesh.setCam(PolyCam.y, Math.min(Polymesh.getCam(PolyCam.y), 0))
    Polymesh.setCam(PolyCam.vx, controller.dx() * (moveSpeed / 4))
    Polymesh.setCam(PolyCam.x, Math.min(Math.max(Polymesh.getCam(PolyCam.x), -80), 80))
})
game.onUpdate(function () {
    scene.setBackgroundImage(image.create(scene.screenWidth(), scene.screenHeight()))
    Polymesh.renderAll(PolyKind.obj, scene.backgroundImage())
})
