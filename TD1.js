// Import modules
const fs = require("fs");
const inquirer = require("inquirer");

// Create a list with the number of occurrences of each attribute value in users
function createCounterList(users, attribute) {
    const counterList = [];
    let counterListIndex;

    for (const user of users) {
        counterListIndex = counterList.findIndex((element) => element[attribute] === user[attribute]);
        if (counterListIndex === -1) {
            counterList.push({ [attribute]: user[attribute], counter: 1 }); // Push if not already in the list
        } else {
            counterList[counterListIndex].counter += 1; // Increase counter if already in the list
        }
    }

    return counterList;
}

async function main() {

    // Load content of users.json
    const rawdata = fs.readFileSync("users.json");
    const users = JSON.parse(rawdata);

    // Loop until user wants to quit
    let done = false;
    // eslint-disable-next-line no-constant-condition
    while (!done) {

        // Display menu
        await inquirer.prompt({
            type: "list",
            name: "attribute",
            message: "What do you want to show?",
            choices: ["Company", "Country", new inquirer.Separator(), "Quit"],
            filter(val) {
                return val.toLowerCase();
            }
        }).then((answers) => {

            // Quit if Quit is selected
            if (answers.attribute == "quit") {
                done = true;
                return;
            }

            // Create the counterList of the selected attribute
            const counterList = createCounterList(users, answers.attribute);

            // Sort in descending order the list
            counterList.sort((a, b) => b.counter - a.counter);

            // Display the list as a table
            console.table(counterList);
        });
    }
}

main();