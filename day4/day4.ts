import fs from "fs";

const requiredLetterMapping: Record<number, string> = {
    0: "X",
    1: "M",
    2: "A",
    3: "S",
}

const data = fs.readFileSync("input", {encoding: "ascii"});

const lines: string[][] = [];
data.split("\n").forEach(line => {
    lines.push(line.split(""));
});

let ans = 0;
let crossCount = 0;
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        let currentLetter = lines[i][j];
        ans += checkForXMAS(lines, i, j, 0, [], null)
        ans += checkForXMASReverse(lines, i, j, 0, [], null)
        if (currentLetter === "A") {
            crossCount += checkForCross(lines, i, j);
        }
    }
}
console.log(ans, crossCount);


function checkForCross(lines: string[][], xStart: number, yStart: number): number {
    // check if x start is valid for cross
    if (xStart === 0 || xStart === lines.length - 1) {
        return 0
    }
    // check if y is valid for a cross
    if (yStart === 0 || yStart === lines[xStart].length - 1) {
        return 0
    }
    const [upperLeftLetter, upperRightLetter, lowerLeftLetter, lowerRightLetter] = [lines[xStart - 1][yStart - 1], lines[xStart - 1][yStart + 1], lines[xStart + 1][yStart - 1], lines[xStart + 1][yStart + 1]];
    if (((upperLeftLetter === "M" && lowerRightLetter === "S") || (upperLeftLetter === "S" && lowerRightLetter === "M")) && ((upperRightLetter === "M" && lowerLeftLetter === "S") || (upperRightLetter === "S" && lowerLeftLetter === "M"))) {
        return 1
    }
    return 0;
}


function checkForXMAS(lines: string[][], xStart: number, yStart: number, currentLetterCount: number, currentLetters: string[], curDirection: number | null): number {
    if (currentLetterCount === 4) {
        return 1;
    }
    // check if we are going out of bounds
    if ((xStart < 0) || (yStart < 0) || (xStart >= lines.length) || (yStart >= lines[xStart].length)) {
        return 0
    }
    const currentLetter = lines[xStart][yStart];
    const requiredLetter = requiredLetterMapping[currentLetterCount];
    if (currentLetter !== requiredLetter) {
        return 0;
    }

    currentLetters.push(`${xStart + 1}-${yStart + 1}`);
    // iterate over right, down and right diagonal based on the direction  1 - left 2 - up 3 - left diagonal up 4 - left diagonal down
    let curAns = 0;
    // if this is essentially the first letter we can go in any direction
    if (!curDirection) {
        curAns = checkForXMAS(lines, xStart, yStart + 1, currentLetterCount + 1, currentLetters, 1) +
            checkForXMAS(lines, xStart + 1, yStart, currentLetterCount + 1, currentLetters, 2) +
            checkForXMAS(lines, xStart + 1, yStart + 1, currentLetterCount + 1, currentLetters, 3) +
            checkForXMAS(lines, xStart - 1, yStart + 1, currentLetterCount + 1, currentLetters, 4)
    } else if (curDirection === 1) {
        curAns = checkForXMAS(lines, xStart, yStart + 1, currentLetterCount + 1, currentLetters, curDirection)
    } else if (curDirection === 2) {
        curAns = checkForXMAS(lines, xStart + 1, yStart, currentLetterCount + 1, currentLetters, curDirection)
    } else if (curDirection === 3) {
        curAns = checkForXMAS(lines, xStart + 1, yStart + 1, currentLetterCount + 1, currentLetters, curDirection)
    } else if (curDirection === 4) {
        curAns = checkForXMAS(lines, xStart - 1, yStart + 1, currentLetterCount + 1, currentLetters, curDirection)
    } else {
        console.log("this should not happen")
    }
    currentLetters.pop();
    return curAns;
}

function checkForXMASReverse(lines: string[][], xStart: number, yStart: number, currentLetterCount: number, currentLetters: string[], curDirection: number | null): number {
    if (currentLetterCount === 4) {
        return 1;
    }
    // check if we are going out of bounds
    if ((xStart < 0) || (yStart < 0) || (xStart >= lines.length) || (yStart >= lines[xStart].length)) {
        return 0
    }
    const currentLetter = lines[xStart][yStart];
    const requiredLetter = requiredLetterMapping[currentLetterCount];
    if (currentLetter !== requiredLetter) {
        1
        return 0;
    }

    currentLetters.push(`${xStart + 1}-${yStart + 1}`);
    // iterate over right, down and right diagonal based on the direction  1 - right 2 - down 3 - diagonal
    let curAns = 0;
    // if this is essentially the first letter we can go in any direction
    if (!curDirection) {
        curAns = checkForXMASReverse(lines, xStart, yStart - 1, currentLetterCount + 1, currentLetters, 1)
            + checkForXMASReverse(lines, xStart - 1, yStart, currentLetterCount + 1, currentLetters, 2)
            + checkForXMASReverse(lines, xStart - 1, yStart - 1, currentLetterCount + 1, currentLetters, 3)
            + checkForXMASReverse(lines, xStart + 1, yStart - 1, currentLetterCount + 1, currentLetters, 4)
    } else if (curDirection === 1) {
        curAns = checkForXMASReverse(lines, xStart, yStart - 1, currentLetterCount + 1, currentLetters, curDirection)
    } else if (curDirection === 2) {
        curAns = checkForXMASReverse(lines, xStart - 1, yStart, currentLetterCount + 1, currentLetters, curDirection)
    } else if (curDirection === 3) {
        curAns = checkForXMASReverse(lines, xStart - 1, yStart - 1, currentLetterCount + 1, currentLetters, curDirection)
    } else if (curDirection === 4) {
        curAns = checkForXMASReverse(lines, xStart + 1, yStart - 1, currentLetterCount + 1, currentLetters, curDirection)
    } else {
        console.log("this should not happen")
    }
    currentLetters.pop();
    return curAns;
}

