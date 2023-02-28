const fs = require("fs");
const process = require("process");

function createCounterList(users, attribute) {
    const counterList = [];
    let counterListIndex;

    for (let i = 0; i < users.length; i++) {
        counterListIndex = counterList.findIndex((element) => element[attribute] === users[i][attribute]);
        if (counterListIndex === -1) {
            counterList.push({ [attribute]: users[i][attribute], counter: 1 });
        } else {
            counterList[counterListIndex].counter += 1;
        }
    }

    return counterList;
}

function main() {
    const rawdata = fs.readFileSync("users.json");
    const users = JSON.parse(rawdata);

    const attribute = process.argv[2];

    let counterList = createCounterList(users, attribute);

    counterList.sort((a, b) => b.counter - a.counter);
    console.log(counterList);
}

main();