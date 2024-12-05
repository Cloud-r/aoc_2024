import fs from "node:fs";

const data = fs.readFileSync("input");
const list1: number[] = [];
const list2: number[] = [];
data
  .toString()
  .split("\n")
  .forEach((line: string) => {
    if (!line.length) {
      return;
    }
    const [l1, l2] = line.split("  ");
    list1.push(Number(l1));
    list2.push(Number(l2));
  });

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

let ans = 0;
for (let i = 0; i < list1.length; i++) {
  ans += Math.abs(list1[i] - list2[i]);
}

let count: Record<number, number> = {};
list2.forEach((num) => {
  count[num] = count[num] ? count[num] + 1 : 1;
});

let similarity = 0;
list1.forEach(num => {
    similarity += num * (count[num] || 0);
})

console.log(ans, similarity);
