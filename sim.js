var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="../libs/core/enums.d.ts"/>
var pxsim;
(function (pxsim) {
    var file;
    (function (file) {
        /**
         * Load file
         * @param path path to load image from! eg: "../cdn/pikachu.jpeg"
         */
        //% weight=90
        //% blockId="loadImage" block="load image from %path"
        function loadImage(path) {
            pxsim.board().loadImage(path);
        }
        file.loadImage = loadImage;
    })(file = pxsim.file || (pxsim.file = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var image;
    (function (image) {
        /**
         * Load file
         * @param width width to resize image to! eg: 100
         */
        //% weight=90
        //% blockId="resizeImage" block="resize the image to a width of %width"
        function resizeImage(width) {
            pxsim.board().resizeImage(width);
        }
        image.resizeImage = resizeImage;
        //% weight=90
        //% blockId="getPixels" block="pixel values of the image"
        function getPixels() {
            return pxsim.board().getPixels();
        }
        image.getPixels = getPixels;
        //% weight=90
        //% blockId="filterImage" block="for each pixel, do the math to %filterType the color values"
        function filterImage(filterType) {
            return pxsim.board().filterImage(filterType);
        }
        image.filterImage = filterImage;
        //% blockId="setASCIIGroup" block="pick the group %groupName"
        function setASCIIGroup(asciiGroup) {
            pxsim.board().setASCIIGroup(asciiGroup);
        }
        image.setASCIIGroup = setASCIIGroup;
        //% blockId="getASCIIGroup" block="the ASCII group"
        function getASCIIGroup() {
            return pxsim.board().getASCIIGroup();
        }
        image.getASCIIGroup = getASCIIGroup;
        //% blockId="pixelsToASCII" block="an ASCII character for each pixel in %list"
        function pixelsToASCII(list) {
            return pxsim.board().pixelsToASCII(list);
        }
        image.pixelsToASCII = pixelsToASCII;
    })(image = pxsim.image || (pxsim.image = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var display;
    (function (display) {
        /**
         * Display message
         */
        //% block="display the text %text" blockId=displayText
        function displayText(text) {
            pxsim.board().displayText(text);
        }
        display.displayText = displayText;
        /**
         * Display pixels
         */
        //% block="display pixels %list" blockId=displayPixels
        function displayPixels(list) {
            pxsim.board().displayPixels(list);
        }
        display.displayPixels = displayPixels;
        //% block="display pixel inspector" blockId=displayPixelInspector
        function displayPixelInspector() {
            pxsim.board().displayPixelInspector();
        }
        display.displayPixelInspector = displayPixelInspector;
        //% block="hide pixel inspector" blockId=hidePixelInspector
        function hidePixelInspector() {
            pxsim.board().hidePixelInspector();
        }
        display.hidePixelInspector = hidePixelInspector;
        //% block="display ASCII group list" blockId=displayGroupList
        function displayGroupList() {
            pxsim.board().displayGroupList();
        }
        display.displayGroupList = displayGroupList;
        //% block="hide ASCII group list" blockId=hideGroupList
        function hideGroupList() {
            pxsim.board().hideGroupList();
        }
        display.hideGroupList = hideGroupList;
    })(display = pxsim.display || (pxsim.display = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var loops;
    (function (loops) {
        /**
         * Repeats the code forever in the background. On each iteration, allows other code to run.
         * @param body the code to repeat
         */
        //% help=functions/forever weight=55 blockGap=8
        //% blockId=device_forever block="forever" 
        function forever(body) {
            pxsim.thread.forever(body);
        }
        loops.forever = forever;
        /**
         * Pause for the specified time in milliseconds
         * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
         */
        //% help=functions/pause weight=54
        //% block="pause (ms) %pause" blockId=device_pause
        function pauseAsync(ms) {
            return Promise.delay(ms);
        }
        loops.pauseAsync = pauseAsync;
    })(loops = pxsim.loops || (pxsim.loops = {}));
})(pxsim || (pxsim = {}));
function logMsg(m) { console.log(m); }
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
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
var pxsim;
(function (pxsim) {
    /**
     * This function gets called each time the program restarts
     */
    pxsim.initCurrentRuntime = function () {
        pxsim.runtime.board = new Board();
    };
    /**
     * Gets the current 'board', eg. program state.
     */
    function board() {
        return pxsim.runtime.board;
    }
    pxsim.board = board;
    /**
     * Represents the entire state of the executing program.
     * Do not store state anywhere else!
     */
    var Board = /** @class */ (function (_super) {
        __extends(Board, _super);
        function Board() {
            var _this = _super.call(this) || this;
            _this.bus = new pxsim.EventBus(pxsim.runtime);
            _this.target = new EventTarget();
            _this.canvasElement = document.getElementById('canvas');
            _this.imageInspectorElement = document.getElementById('image-inspector');
            _this.textElement = document.getElementById('text');
            _this.groupListElement = document.getElementById('group-list');
            _this.elements = [
                _this.canvasElement,
                _this.imageInspectorElement,
                _this.textElement,
                _this.groupListElement,
            ];
            _this.hidePixelInspector();
            _this.hideGroupList();
            _this.initListeners();
            return _this;
        }
        Board.prototype.initListeners = function () {
            var board = this;
            board.p5SketchInitializedPromise = new Promise(function (resolve) {
                board.target.addEventListener('p5Sketch.initialized', function () {
                    resolve();
                });
            });
        };
        Board.prototype.initAsync = function (msg) {
            var board = this;
            board.canvasElement.innerHTML = ''; // clear canvas
            board.textElement.innerHTML = ''; // clear canvas
            document.body.innerHTML = ''; // clear children
            board.elements.forEach(function (element) {
                document.body.appendChild(element);
            });
            board.p5Sketch = new p5(board.makeSketch.bind(board), board.canvasElement, true);
            return board.p5SketchInitializedPromise;
        };
        Board.prototype.makeSketch = function (sketch) {
            var board = this;
            function setup() {
                sketch.noLoop();
            }
            function draw() {
                sketch.clear();
                board.target.dispatchEvent(new CustomEvent('p5Sketch.initialized'));
            }
            function mouseMoved() {
                if (!board.p5Image) {
                    return;
                }
                if (board.showPixelInspector &&
                    sketch.mouseX < board.p5Image.width && sketch.mouseX >= 0 &&
                    sketch.mouseY < board.p5Image.height && sketch.mouseY >= 0) {
                    document.getElementById('pixel-preview--color-box')
                        .style
                        .backgroundColor = "rgba(" + sketch.get(sketch.mouseX, sketch.mouseY) + ")";
                    document.getElementById('pixel-preview--text')
                        .innerHTML = "<span class=\"rgba-label\"><span>r</span><span>g</span><span>b</span><span>a</span></span>(<span class=\"rgba-label rgba-label--fixed-width\"><span>" + sketch.get(sketch.mouseX, sketch.mouseY).join('</span>, <span>') + "</span></span>)";
                }
            }
            sketch.setup = setup;
            sketch.draw = draw;
            sketch.mouseMoved = mouseMoved;
        };
        Board.prototype.showImage = function () {
            var board = this;
            if (board.p5Sketch.canvas.width !== board.p5Image.width ||
                board.p5Sketch.canvas.height !== board.p5Image.height) {
                board.p5Sketch.resizeCanvas(board.p5Image.width, board.p5Image.height);
            }
            board.p5Sketch.image(board.p5Image, 0, 0);
            board.updatePixels();
        };
        Board.prototype.updatePixels = function () {
            var board = this;
            board.p5Sketch.get();
            board.p5Image.loadPixels();
            board.chunkedPixels = _.chunk(board.p5Sketch.pixels, 4);
        };
        Board.prototype.loadImage = function (path) {
            var board = this;
            board.p5Sketch.draw = function () {
                board.p5Sketch.loadImage(path, function (image) {
                    board.p5Image = image;
                    board.target.dispatchEvent(new CustomEvent('image.loaded'));
                    board.showImage();
                });
            };
            board.p5Sketch.redraw();
        };
        Board.prototype.resizeImage = function (width) {
            var board = this;
            function run() {
                board.p5Sketch.draw = function () {
                    board.p5Image.resize(width, 0);
                    board.showImage();
                };
                board.p5Sketch.redraw();
            }
            if (board.p5Image) {
                run();
            }
            else {
                board.target.addEventListener('image.loaded', function () {
                    run();
                });
            }
        };
        Board.prototype.getPixels = function () {
            var board = this;
            if (board.p5Sketch && board.p5Image) {
                return board.chunkedPixels;
            }
            return [[]];
        };
        Board.prototype.getGrayValues = function () {
            var board = this;
            if (board.p5Sketch && board.p5Image) {
                return _.map(board.chunkedPixels, 0);
            }
            return [];
        };
        Board.prototype.filterImage = function (filterType) {
            var board = this;
            switch (filterType) {
                case 0 /* Threshold */:
                    board.p5Sketch.filter(board.p5Sketch.THRESHOLD);
                    break;
                case 1 /* Gray */:
                    board.p5Sketch.filter(board.p5Sketch.GRAY);
                    break;
                case 2 /* Opaque */:
                    board.p5Sketch.filter(board.p5Sketch.OPAQUE);
                    break;
                case 3 /* Invert */:
                    board.p5Sketch.filter(board.p5Sketch.INVERT);
                    break;
                case 4 /* Posterize */:
                    board.p5Sketch.filter(board.p5Sketch.POSTERIZE, 3);
                    break;
                case 5 /* Blur */:
                    board.p5Sketch.filter(board.p5Sketch.BLUR, 3);
                    break;
                case 6 /* Erode */:
                    board.p5Sketch.filter(board.p5Sketch.ERODE);
                    break;
                case 7 /* Dilate */:
                    board.p5Sketch.filter(board.p5Sketch.DILATE);
                    break;
            }
            board.updatePixels();
        };
        Board.prototype.applyGrayScale = function () {
            var board = this;
            board.p5Sketch.filter(board.p5Sketch.GRAY);
            board.updatePixels();
        };
        Board.prototype.setASCIIGroup = function (asciiGroup) {
            var board = this;
            switch (asciiGroup) {
                case 0 /* GroupOne */:
                    board.asciiGroup = ['..', '%%', '@@', '??', 'SS', '++', '..', '**', '::', ',,', '..'];
                    break;
                case 1 /* GroupTwo */:
                    board.asciiGroup = ['##', '??', '%%', '..', 'SS', '++', '..', '**', '::', '..', '  '];
                    break;
                case 2 /* GroupThree */:
                    board.asciiGroup = ['##', '??', '%%', '..', 'SS', '++', '..', '**', '::', ',,', '..'];
                    break;
                case 3 /* GroupFour */:
                    board.asciiGroup = ["$$", "@@", "BB", "%%", "88", "&&", "WW", "MM", "##", "**", "oo", "aa", "hh", "kk", "bb", "dd", "pp", "qq", "ww", "mm", "ZZ", "OO", "00", "QQ", "LL", "CC", "JJ", "UU", "YY", "XX", "zz", "cc", "vv", "uu", "nn", "xx", "rr", "jj", "ff", "tt", "//", "\\", "||", "((", "))", "11", "{{", "}}", "[[", "]]", "??", "--", "__", "++", "~~", "<<", ">>", "ii", "!!", "ll", "II", ";;", "::", ",,", '""', "^^", "``", "''", "..", "  "];
                    break;
                case 4 /* GroupFive */:
                    board.asciiGroup = ['##', 'vv', 'tt', "{{", '??', '++', '::', '~~', '**', '..', '  '];
                    break;
            }
        };
        Board.prototype.getASCIIGroup = function () {
            var board = this;
            return board.asciiGroup;
        };
        Board.prototype.pixelsToASCII = function (pixels) {
            var board = this;
            var chars = _.map(board.chunkedPixels, function (pixel) {
                var asciiIndex = board.p5Sketch.map(pixel[0], 0, 255, 0, board.asciiGroup.length - 1);
                return board.asciiGroup[Math.round(asciiIndex)];
            });
            var lines = _.chunk(chars.join('').split(''), board.p5Image.width * 2);
            return _.map(lines, function (line) {
                return line.join('');
            }).join('\n');
        };
        Board.prototype.updateEachPixel = function (handleEachPixel) {
            var board = this;
            if (!board.p5Image ||
                _.isEmpty(board.p5Image.pixels)) {
                return;
            }
            board.chunkedPixels.forEach(function (pixel, index) {
                // handleEachPixel(board.chunkedPixels[index], index);
                board.p5Image.pixels[index * 4] = board.chunkedPixels[index][0];
                board.p5Image.pixels[index * 4 + 1] = board.chunkedPixels[index][1];
                board.p5Image.pixels[index * 4 + 2] = board.chunkedPixels[index][2];
                board.p5Image.pixels[index * 4 + 3] = board.chunkedPixels[index][3];
            });
            board.p5Sketch.draw = function () {
                board.p5Image.updatePixels();
                board.showImage();
            };
            board.p5Sketch.redraw();
        };
        Board.prototype.displayText = function (text) {
            var board = this;
            board.textElement.innerHTML = '<pre>' + text.toString() + '</pre>';
        };
        Board.prototype.displayPixels = function (pixels) {
            var board = this;
            if (_.isEmpty(pixels)) {
                return;
            }
            var pixelHTML = _.map(pixels, function (pixel) {
                return '<span class="pixel" style="border-bottom-color: rgba(' + pixel.join(', ') + ');">' + pixel.join(', ') + '</span>';
            }).join('');
            board.textElement.innerHTML = pixelHTML;
        };
        Board.prototype.displayPixelInspector = function () {
            var board = this;
            board.showPixelInspector = true;
            board.imageInspectorElement.className = '';
        };
        Board.prototype.hidePixelInspector = function () {
            var board = this;
            board.showPixelInspector = false;
            board.imageInspectorElement.className = 'hidden';
        };
        Board.prototype.displayGroupList = function () {
            var board = this;
            board.groupListElement.className = '';
        };
        Board.prototype.hideGroupList = function () {
            var board = this;
            board.groupListElement.className = 'hidden';
        };
        Board.prototype.updateView = function () {
            console.log("Update view");
        };
        return Board;
    }(pxsim.BaseBoard));
    pxsim.Board = Board;
})(pxsim || (pxsim = {}));
