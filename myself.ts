
namespace Polymesh {

    //% blockId=poly_camera_setpos
    //% block="set camera position to x: $x y: $y z: $z"
    //% group="main camera"
    //% weight=3
    export function setCamPosition(x: number, y: number, z: number) { 
        camview.pos.x = x, camview.pos.y = y, camview.pos.z = z;// [camPos.x, camPos.y, camPos.z] = [x, y, z]
    }

    //% blockId=poly_angle_change
    //% block="change $choice by $x"
    //% group="main angle"
    //% weight=5
    export function changeAngle(choice: PolyAngle, x: number) {
        camview.changeAngle(choice, x)
    }
    //% blockId=poly_camera_change
    //% block="change $choice by $x"
    //% group="main camera"
    //% weight=5
    export function changeCam(choice: PolyCam, x: number) {
        camview.changePos(choice, x)
    }
    //% blockId=poly_angle_set
    //% block="set $choice to $x"
    //% group="main angle"
    //% weight=10
    export function setAngle(choice: PolyAngle, x: number) {
        camview.setAngle(choice, x)
    }
    //% blockId=poly_camera_set
    //% block="set $choice to $x"
    //% group="main camera"
    //% weight=10
    export function setCam(choice: PolyCam, x: number) {
        camview.setPos(choice, x)
    }

    //% blockId=poly_angle_get
    //% block="$choice"
    //% group="main angle"
    //% weight=4
    export function getAngle(choice: PolyAngle) {
        return camview.getAngle(choice)
    }

    //% blockId=poly_camera_get
    //% block="$choice"
    //% group="main camera"
    //% weight=4
    export function getCam(choice: PolyCam) {
        return camview.getPos(choice)
    }

    //% blockId=poly_camera_viewport
    //% block=" set camera viewport image to $viewport=image_picker"
    //% group="render"
    //% weight=9qee
    export function setCamViewport(viewport: Image) {
        
    }

}
