/// <reference path="../libs/core/enums.d.ts"/>

namespace pxsim.file {
    /**
     * Load file
     * @param path path to load image from! eg: "../cdn/pikachu.jpeg"
     */
    //% weight=90
    //% blockId="loadImage" block="load image from %path"
    export function loadImage(path: string) {
        board().loadImage(path);
    }
}

namespace pxsim.image {
    /**
     * Load file
     * @param width width to resize image to! eg: 100
     */
    //% weight=90
    //% blockId="resizeImage" block="resize the image to a width of %width"
    export function resizeImage(width: number) {
        board().resizeImage(width);
    }

    //% weight=90
    //% blockId="getPixels" block="pixel values of the image"
    export function getPixels() {
        return board().getPixels();
    }

    //% weight=90
    //% blockId="filterImage" block="for each pixel, do the math to %filterType the color values"
    export function filterImage(filterType: Filters) {
        return board().filterImage(filterType);
    }

    //% blockId="setASCIIGroup" block="pick the group %groupName"
    export function setASCIIGroup(asciiGroup: ASCIIGroups) {
        board().setASCIIGroup(asciiGroup);
    }

    //% blockId="pixelsToASCII" block="an ASCII character for each pixel in %list"
    export function pixelsToASCII(list:number[][]) {
        return board().pixelsToASCII(list);
    }
}

namespace pxsim.display {
    /**
     * Display message
     */
    //% block="display the message %text" blockId=displayText
    export function displayText(text:string) {
        board().displayText(text);
    }
    /**
     * Display pixels
     */
    //% block="display pixels %list" blockId=displayPixels
    export function displayPixels(list:number[][]) {
        board().displayPixels(list);
    }

    //% block="display pixel inspector" blockId=displayPixelInspector
    export function displayPixelInspector() {
        board().displayPixelInspector();
    }

    //% block="hide pixel inspector" blockId=hidePixelInspector
    export function hidePixelInspector() {
        board().hidePixelInspector();
    }

}

namespace pxsim.loops {

    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever" 
    export function forever(body: RefAction): void {
        thread.forever(body)
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    export function pauseAsync(ms: number) {
        return Promise.delay(ms)
    }
}

function logMsg(m:string) { console.log(m) }

// namespace pxsim.console {
//     /**
//      * Print out message
//      */
//     //% block="log the message %msg" blockId=log_message
//     export function log(msg:string) {
//         logMsg("CONSOLE: " + msg)
//         // why doesn't that work?
//         board().writeSerial(msg + "\n")
//     }
//     //% block="log the number %msg" blockId=log_number
//     export function logNumber(msg:number[]) {
//         logMsg("CONSOLE: " + msg.toString())
//         // why doesn't that work?
//         board().writeSerial(msg.toString() + "\n")
//     }
// }
