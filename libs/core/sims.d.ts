// Auto-generated from simulator. Do not edit.
declare namespace file {
    /**
     * Load file
     * @param path path to load image from! eg: "../cdn/pikachu.jpeg"
     */
    //% weight=90
    //% blockId="loadImage" block="load image from %path"
    //% shim=file::loadImage
    function loadImage(path: string): void;

}
declare namespace image {
    /**
     * Load file
     * @param width width to resize image to! eg: 100
     */
    //% weight=90
    //% blockId="resizeImage" block="resize the image to a width of %width"
    //% shim=image::resizeImage
    function resizeImage(width: number): void;

    //% weight=90
    //% blockId="getPixels" block="pixel values of the image"
    //% shim=image::getPixels
    function getPixels(): number[][];

    //% weight=90
    //% blockId="filterImage" block="for each pixel, do the math to %filterType the color values"
    //% shim=image::filterImage
    function filterImage(filterType: Filters): void;

    //% blockId="setASCIIGroup" block="pick the group %groupName"
    //% shim=image::setASCIIGroup
    function setASCIIGroup(asciiGroup: ASCIIGroups): void;

    //% blockId="getASCIIGroup" block="the ASCII group"
    //% shim=image::getASCIIGroup
    function getASCIIGroup(): string[];

    //% blockId="pixelsToASCII" block="an ASCII character for each pixel in %list"
    //% shim=image::pixelsToASCII
    function pixelsToASCII(list: number[][]): string;

}
declare namespace display {
    /**
     * Display message
     */
    //% block="display the text %text" blockId=displayText
    //% shim=display::displayText
    function displayText(text: string): void;

    /**
     * Display pixels
     */
    //% block="display pixels %list" blockId=displayPixels
    //% shim=display::displayPixels
    function displayPixels(list: number[][]): void;

    //% block="display pixel inspector" blockId=displayPixelInspector
    //% shim=display::displayPixelInspector
    function displayPixelInspector(): void;

    //% block="hide pixel inspector" blockId=hidePixelInspector
    //% shim=display::hidePixelInspector
    function hidePixelInspector(): void;

    //% block="display ASCII group list" blockId=displayGroupList
    //% shim=display::displayGroupList
    function displayGroupList(): void;

    //% block="hide ASCII group list" blockId=hideGroupList
    //% shim=display::hideGroupList
    function hideGroupList(): void;

}
declare namespace loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever"
    //% shim=loops::forever
    function forever(body: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    //% shim=loops::pauseAsync promise
    function pause(ms: number): void;

}

// Auto-generated. Do not edit. Really.
