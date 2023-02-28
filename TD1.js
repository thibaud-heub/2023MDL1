const fs = require("fs");
const process = require("process");
const rawdata = fs.readFileSync("users.json");
const users = JSON.parse(rawdata);

const attribute = process.argv[2];
const orderedList = [];
let orderedListIndex;

for (let i = 0; i < users.length; i++) {
    orderedListIndex = orderedList.findIndex((element) => element[attribute] === users[i][attribute]);
    if (orderedListIndex === -1) {
        orderedList.push({[attribute]: users[i][attribute], counter: 1});
    } else {
        orderedList[orderedListIndex].counter += 1;
    }
}

orderedList.sort((a, b) => b.counter - a.counter);
console.log(orderedList);
