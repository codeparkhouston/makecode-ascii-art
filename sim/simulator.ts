/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

declare let p5: any;
declare let _: any;

namespace pxsim {
    /**
     * This function gets called each time the program restarts
     */
    initCurrentRuntime = () => {
        runtime.board = new Board();
    };

    /**
     * Gets the current 'board', eg. program state.
     */
    export function board() : Board {
        return runtime.board as Board;
    }

    /**
     * Represents the entire state of the executing program.
     * Do not store state anywhere else!
     */
    export class Board extends pxsim.BaseBoard {
        public bus: EventBus;
        public canvasElement : any;
        public imageInspectorElement : any;
        public textElement : any;
        public groupListElement : any;
        public elements: any[];

        public p5Image: any;
        public p5Sketch: any;
        public chunkedPixels: number[][];

        public showPixelInspector: Boolean;
        public asciiGroup: string[];

        private target: EventTarget;
        private p5SketchInitializedPromise: Promise<void>;

        constructor() {
            super();
            this.bus = new EventBus(runtime);
            this.target = new EventTarget();

            this.canvasElement = document.getElementById('canvas');
            this.imageInspectorElement = document.getElementById('image-inspector');
            this.textElement = document.getElementById('text');
            this.groupListElement = document.getElementById('group-list');

            this.elements = [
                this.canvasElement,
                this.imageInspectorElement,
                this.textElement,
                this.groupListElement,
            ];

            this.hidePixelInspector();
            this.hideGroupList();
            this.initListeners();
        }

        initListeners() {
            let board = this;

            board.p5SketchInitializedPromise = new Promise(function(resolve){
                board.target.addEventListener('p5Sketch.initialized', function(){
                    resolve();
                });
            });
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            let board = this;

            board.canvasElement.innerHTML = ''; // clear canvas
            board.textElement.innerHTML = ''; // clear canvas
            document.body.innerHTML = ''; // clear children

            board.elements.forEach((element) => {
                document.body.appendChild(element);
            });

            board.p5Sketch = new p5(board.makeSketch.bind(board), board.canvasElement, true);
            return board.p5SketchInitializedPromise;
        }

        makeSketch(sketch: any) {
            let board = this;

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
                if (
                    board.showPixelInspector &&
                    sketch.mouseX < board.p5Image.width && sketch.mouseX >= 0 &&
                    sketch.mouseY < board.p5Image.height && sketch.mouseY >= 0
                ) {
                    document.getElementById('pixel-preview--color-box')
                      .style
                      .backgroundColor = `rgba(${sketch.get(sketch.mouseX, sketch.mouseY)})`;
                    document.getElementById('pixel-preview--text')
                      .innerHTML = `<span class="rgba-label"><span>r</span><span>g</span><span>b</span><span>a</span></span>(<span class="rgba-label rgba-label--fixed-width"><span>${sketch.get(sketch.mouseX, sketch.mouseY).join('</span>, <span>')}</span></span>)`;
                }
            }

            sketch.setup = setup;
            sketch.draw = draw;
            sketch.mouseMoved = mouseMoved;
        }

        showImage() {
            let board = this;
            if (
                board.p5Sketch.canvas.width !== board.p5Image.width ||
                board.p5Sketch.canvas.height !== board.p5Image.height
            ) {
                board.p5Sketch.resizeCanvas(board.p5Image.width, board.p5Image.height);
            }
            board.p5Sketch.image(board.p5Image, 0, 0);

            board.updatePixels();
        }

        updatePixels() {
            let board = this;
            board.p5Sketch.get();
            board.p5Image.loadPixels();
            board.chunkedPixels = _.chunk(board.p5Sketch.pixels, 4);
        }

        loadImage(path: string) {
            let board = this;

            board.p5Sketch.draw = function() {
                board.p5Sketch.loadImage(path, function(image: any){
                    board.p5Image = image;
                    board.target.dispatchEvent(new CustomEvent('image.loaded'));
                    board.showImage();
                });
            };
            board.p5Sketch.redraw();
        }

        resizeImage(width: number) {
            let board = this;

            function run() {
                board.p5Sketch.draw = function() {
                    board.p5Image.resize(width, 0);
                    board.showImage();
                };
                board.p5Sketch.redraw();
            }

            if (board.p5Image) {
                run();
            } else {
                board.target.addEventListener('image.loaded', function() {
                    run();
                });
            }
        }

        getPixels(): number[][] {
            let board = this;

            if (board.p5Sketch && board.p5Image) {
                return board.chunkedPixels;
            }

            return [[]];
        }

        getGrayValues(): number[] {
            let board = this;

            if (board.p5Sketch && board.p5Image) {
                return _.map(board.chunkedPixels, 0);
            }

            return [];
        }

        filterImage(filterType: Filters) {
            let board = this;

            switch(filterType) {
                case Filters.Threshold:
                    board.p5Sketch.filter(board.p5Sketch.THRESHOLD);
                    break;

                case Filters.Gray:
                    board.p5Sketch.filter(board.p5Sketch.GRAY);
                    break;

                case Filters.Opaque:
                    board.p5Sketch.filter(board.p5Sketch.OPAQUE);
                    break;

                case Filters.Invert:
                    board.p5Sketch.filter(board.p5Sketch.INVERT);
                    break;

                case Filters.Posterize:
                    board.p5Sketch.filter(board.p5Sketch.POSTERIZE, 3);
                    break;

                case Filters.Blur:
                    board.p5Sketch.filter(board.p5Sketch.BLUR, 3);
                    break;

                case Filters.Erode:
                    board.p5Sketch.filter(board.p5Sketch.ERODE);
                    break;

                case Filters.Dilate:
                    board.p5Sketch.filter(board.p5Sketch.DILATE);
                    break;
            }

            board.updatePixels();
        }

        applyGrayScale() {
            let board = this;
            board.p5Sketch.filter(board.p5Sketch.GRAY);
            board.updatePixels();
        }

        setASCIIGroup(asciiGroup: ASCIIGroups) {
            let board = this;

            switch(asciiGroup) {
                case ASCIIGroups.GroupOne:
                    board.asciiGroup = [ '..', '%%', '@@', '??', 'SS', '++', '..', '**', '::', ',,', '..'];
                    break;
                case ASCIIGroups.GroupTwo:
                    board.asciiGroup = [ '##', '??', '%%', '..', 'SS', '++', '..', '**', '::', '..', '  '];
                    break;
                case ASCIIGroups.GroupThree:
                    board.asciiGroup = [ '##', '??', '%%', '..', 'SS', '++', '..', '**', '::', ',,', '..'];
                    break;
                case ASCIIGroups.GroupFour:
                    board.asciiGroup = ["$$","@@","BB","%%","88","&&","WW","MM","##","**","oo","aa","hh","kk","bb","dd","pp","qq","ww","mm","ZZ","OO","00","QQ","LL","CC","JJ","UU","YY","XX","zz","cc","vv","uu","nn","xx","rr","jj","ff","tt","//","\\","||","((","))","11","{{","}}","[[","]]","??","--","__","++","~~","<<",">>","ii","!!","ll","II",";;","::",",,",'""',"^^","``","''","..","  "];
                    break;
                case ASCIIGroups.GroupFive:
                    board.asciiGroup = [ '##', 'vv', 'tt', "{{", '??', '++', '::', '~~', '**', '..', '  '];
                    break;
            }
        }

        getASCIIGroup():string[] {
            let board = this;
            return board.asciiGroup;
        }

        pixelsToASCII(pixels: number[][]):string {
            let board = this;
            let chars = _.map(board.chunkedPixels, function(pixel: number[]){
                let asciiIndex = board.p5Sketch.map(pixel[0], 0, 255, 0, board.asciiGroup.length - 1);
                return board.asciiGroup[Math.round(asciiIndex)];
            });
            let lines = _.chunk(chars.join('').split(''), board.p5Image.width * 2);

            return _.map(lines, function(line: string[]){
                return line.join('');
            }).join('\n');
        }

        updateEachPixel(handleEachPixel: RefAction) {
            let board = this;
            if (
                !board.p5Image ||
                _.isEmpty(board.p5Image.pixels)
            ) {
                return;
            }

            board.chunkedPixels.forEach(function(pixel: number[], index: number) {
                // handleEachPixel(board.chunkedPixels[index], index);
                board.p5Image.pixels[index * 4] = board.chunkedPixels[index][0];
                board.p5Image.pixels[index * 4 + 1] = board.chunkedPixels[index][1];
                board.p5Image.pixels[index * 4 + 2] = board.chunkedPixels[index][2];
                board.p5Image.pixels[index * 4 + 3] = board.chunkedPixels[index][3];
            });

            board.p5Sketch.draw = function() {
                board.p5Image.updatePixels();
                board.showImage();
            };
            board.p5Sketch.redraw();
        }

        displayText(text: string) {
            let board = this;
            board.textElement.innerHTML = '<pre>' + text.toString() + '</pre>';
        }

        displayPixels(pixels: number[][]) {
            let board = this;
            if (_.isEmpty(pixels)) {
                return;
            }
            let pixelHTML = _.map(pixels, function(pixel: number[]) {
                return '<span class="pixel" style="border-bottom-color: rgba(' + pixel.join(', ') + ');">' + pixel.join(', ') + '</span>'
            }).join('');
            board.textElement.innerHTML = pixelHTML;
        }

        displayPixelInspector() {
            let board = this;
            board.showPixelInspector = true;
            board.imageInspectorElement.className = '';
        }

        hidePixelInspector() {
            let board = this;
            board.showPixelInspector = false;
            board.imageInspectorElement.className = 'hidden';
        }

        displayGroupList() {
            let board = this;
            board.groupListElement.className = '';
        }

        hideGroupList() {
            let board = this;
            board.groupListElement.className = 'hidden';
        }

        updateView() {
            console.log("Update view");
        }
    }
}