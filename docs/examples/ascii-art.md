# ASCII Art

```blocks
let ascii_art = ""
file.loadImage("https://upload.wikimedia.org/wikipedia/sh/7/77/Pikachu.png")
display.displayPixelInspector()
image.resizeImage(50)
loops.pause(100)
display.displayPixels(image.getPixels())
loops.pause(100)
image.filterImage(Filters.Gray)
display.displayPixels(image.getPixels())
image.setASCIIGroup(ASCIIGroups.GroupOne)
ascii_art = image.pixelsToASCII(image.getPixels())
display.displayText(ascii_art)
```