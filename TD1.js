const fs = require('fs');
let rawdata = fs.readFileSync('users.json');
let users = JSON.parse(rawdata);

let attribute = process.argv[2];
let orderedList = [];
let orderedListIndex = undefined;

for (let i = 0; i < users.length; i++) {
    orderedListIndex = orderedList.findIndex((element) => element[attribute] == users[i][attribute]);
    if (orderedListIndex == -1) {
        orderedList.push({ [attribute]: users[i][attribute], "counter": 1 });
    } else {
        orderedList[orderedListIndex]["counter"] += 1;
    }
}

orderedList.sort((a,b) => (a["counter"] <= b["counter"])?1:-1)
console.log(orderedList);