import fs from "fs";

const data = fs.readFileSync("input", {encoding: "ascii"});

const dependencyArray: Record<string, Set<string>> = {};
const lines = data.split("\n");
const nodes = new Set<string>();
const checks: string[][] = [];
let parseInput = false;
for (let i = 0; i < lines.length; i++) {
    const curLine = lines[i];
    if (curLine.length === 0) {
        parseInput = true;
        continue;
    }
    if (!parseInput) {
        const [a, b] = curLine.split("|");
        if (!dependencyArray[b]) {
            dependencyArray[b] = new Set();
        }
        dependencyArray[b].add(a)
        nodes.add(a);
        nodes.add(b);
    } else {
        checks.push(curLine.split(","));
    }
}

nodes.forEach(node => {
    if (!dependencyArray[node]) {
        dependencyArray[node] = new Set();
    }
})


let ans = 0;
checks.forEach((check) => {
    let curDependency: Set<string> = new Set();
    let isValid = true;
    // validate if the check is proper
    for (let i = 0; i < check.length; i++) {
        let page = check[i];
        if (curDependency.has(page)) {
            isValid = false;
            break
        }
        curDependency = new Set([...curDependency, ...dependencyArray[page], page])
    }

    if (isValid) {
        // ans += Number(check[Math.floor(check.length / 2)]);
    } else {
        ans += calculateOrder(dependencyArray, check)
    }
})


function calculateOrder(depo: Record<string, Set<string>>, check: string[]): number {
    let curCheckCount: Record<string, number> = {};
    let cache = new Set();
    for (let i = 0; i < check.length; i++) {
        let currentPage = check[i];
        let curDepLength = 0;
        for (let j = 0; j < check.length; j++) {
            if (depo[currentPage].has(check[j])) {
                curDepLength++;
            }
        }
        curCheckCount[currentPage] = curDepLength;
        if (cache.has(curDepLength)) {
            console.log("this should not happen");
        }
        cache.add(curDepLength);
    }

    check.sort((a, b) => {
        return curCheckCount[a] - curCheckCount[b];
    })

    return Number(check[Math.floor(check.length / 2)]);
}


console.log(ans);
