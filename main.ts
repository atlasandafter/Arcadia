var Jimp = require('jimp');

let inputText = `your mom's gay lmao`;
const scaleFactor = 8;

//map coordinates to characters
let charCoords = {
    ' ': [0, 5],
    'a': [0, 0], 'b': [0, 1], 'c': [0, 2], 'd': [0, 3], 'e': [0, 4],
    'f': [1, 0], 'g': [1, 1], 'h': [1, 2], 'i': [1, 3], 'j': [1, 4],
    'k': [2, 0], 'l': [2, 1], 'm': [2, 2], 'n': [2, 3], 'o': [2, 4],
    'p': [3, 0], 'q': [3, 1], 'r': [3, 2], 's': [3, 3], 't': [3, 4],
    'u': [4, 0], 'v': [4, 1], 'w': [4, 2], 'x': [4, 3], 'y': [4, 4],
    'z': [5, 0], '1': [5, 1], '2': [5, 2], '3': [5, 3], '4': [5, 4],
    '5': [6, 0], '6': [6, 1], '7': [6, 2], '8': [6, 3], '9': [6, 4],
    '0': [7, 0], '.': [7, 1], ',': [7, 2], ';': [7, 3], ':': [7, 4],
    '@': [8, 0], '#': [8, 1], '\'':[8, 2], '!': [8, 3], '"': [8, 4],
    '/': [9, 0], '?': [9, 1], '%': [9, 2], '>': [9, 3], '<': [9, 4],
    '_': [10, 0],
    
}

//map each character's width
let charWidth = {
    ' ': 2,
    'a': 6, 'b': 7, 'c': 5, 'd': 6, 'e': 5,
    'f': 6, 'g': 6, 'h': 6, 'i': 4, 'j': 6,
    'k': 6, 'l': 5, 'm': 8, 'n': 7, 'o': 6,
    'p': 6, 'q': 7, 'r': 6, 's': 6, 't': 6,
    'u': 6, 'v': 6, 'w': 8, 'x': 6, 'y': 6,
    'z': 6, '1': 4, '2': 6, '3': 6, '4': 6,
    '5': 6, '6': 6, '7': 6, '8': 6, '9': 6,
    '0': 6, '.': 2, ',': 2, ';': 2, ':': 2,
    '@': 7, '#': 7, '\'':1, '!': 2, '"': 4,
    '/': 5, '?': 6, '%': 7, '>': 6, '<': 6,
    '_': 6
}


//calculate image width
let imageWidth = inputText.length - 1;
for (let char of inputText) {
    imageWidth += charWidth[char];
}

// helper function -> get and return the crop coordinates for given char
let getCharCoordinates = (char) => {
    let x = 2 + charCoords[char][0] * 9;
    let y = 2 + charCoords[char][1] * 9;
    console.log(`Char Coord Y is ${charCoords[char][1]}`)
    let cry = Number(y + 8);
    let crx = Number(x + charWidth[char])
    let numbers = [x, y, crx, cry];
    return numbers;
}

//draws the text from a string input
async function writeText(input) {
    input = input.toLowerCase();

    //create image using image width
    let outputImage = new Jimp(imageWidth, 8, 'output', (err, image) => {
        if (err) throw err
    });
    
    const source = await Jimp.read('./arcadia font.png')
    let cursor = 0; //creates a cursor position that will be used to draw characters

    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        console.log(char);
        let cropCoords = getCharCoordinates(char);
        console.log(cropCoords);
        outputImage.blit(source, cursor, 0, cropCoords[0], cropCoords[1], cropCoords[2], cropCoords[3] );
        cursor = cursor + 1 + charWidth[char];
    }

    outputImage.scale(scaleFactor, Jimp.RESIZE_NEAREST_NEIGHBOR);
    outputImage.write('./output.png')
    
    
}

writeText(inputText);
