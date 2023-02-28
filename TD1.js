// Import modules

const fs = require("fs");
const process = require("process");

// Create a list with the number of occurrences of each attribute value in users
function createCounterList(users, attribute) {
    const counterList = [];
    let counterListIndex;

    for (let i = 0; i < users.length; i++) {
        counterListIndex = counterList.findIndex((element) => element[attribute] === users[i][attribute]);
        if (counterListIndex === -1) {
            counterList.push({ [attribute]: users[i][attribute], counter: 1 }); // Push if not already in the list
        } else {
            counterList[counterListIndex].counter += 1; // Increase counter if already in the list
        }
    }

    return counterList;
}

function main() {

    // Load content of users.json
    const rawdata = fs.readFileSync("users.json");
    const users = JSON.parse(rawdata);

    // Take attribute in command argument
    const attribute = process.argv[2];

    let counterList = createCounterList(users, attribute);

    // Sort in descending order the list
    counterList.sort((a, b) => b.counter - a.counter);
    console.log(counterList);
}

main();