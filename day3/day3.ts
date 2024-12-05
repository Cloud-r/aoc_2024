import fs from "node:fs";

const data = fs.readFileSync("input").toString();
const regexp = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
const iter = data.matchAll(regexp);
let ans = 0;
let isEnabled = true;
while (true) {
  const match = iter.next();
  if (match.done) {
    break;
  }
  if(match.value[0] === "do()") {
    isEnabled = true;
    continue;
  }
  if(match.value[0] === "don't()") {
    isEnabled = false;
    continue;
  }
  if (!isEnabled) {
    continue;
  }
  ans += Number(match.value[1]) * Number(match.value[2]);
}

console.log(ans);
