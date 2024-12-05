import fs from "node:fs";

const data = fs.readFileSync("input");
const result: number[][] = [];
data
  .toString()
  .split("\r\n")
  .forEach((line) => {
    result.push(line.split(" ").map((s) => Number(s)));
  });

let validCount = 0;
for (let i = 0; i < result.length; i++) {
  const level = result[i];
  for (let j = 0; j < level.length; j++) {
    const mod = [...level];
    mod.splice(j, 1);
    if (calcValid(mod)) {
      validCount++;
      break;
    }
  }
}

function calcValid(level: number[]): boolean {
  let dir = 0;
  let isValid = true;
  for (let j = 1; j < level.length; j++) {
    let diff = Math.abs(level[j] - level[j - 1]);
    if (diff < 1 || diff > 3) {
      isValid = false;
      break;
    }
    let curDir = level[j] > level[j - 1] ? 1 : -1;
    if (dir === 0) {
      dir = curDir;
    }

    if (curDir !== dir) {
      isValid = false;
      break;
    }
  }

  return isValid;
}

console.log(validCount);
